// Token exchange API for ClarityX
// This serverless function exchanges Supabase tokens for app tokens

const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

// Initialize Supabase client with admin privileges
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseServiceKey ? 
  createClient(supabaseUrl, supabaseServiceKey) : null;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }
    
    // Check if we have Supabase configured
    if (!supabase) {
      // If Supabase is not configured, use mock implementation
      handleMockVerification(token, res);
      return;
    }
    
    // Verify the token with Supabase
    try {
      // Decode the token to get the user ID
      const decoded = jwt.decode(token);
      
      if (!decoded || !decoded.sub) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid token' 
        });
      }
      
      // Get user data from Supabase
      const { data: userData, error } = await supabase.auth.admin.getUserById(decoded.sub);
      
      if (error || !userData) {
        return res.status(401).json({ 
          success: false, 
          message: 'Token verification failed',
          details: error?.message
        });
      }
      
      // Get user profile from profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.id)
        .single();
      
      // Get membership details
      const { data: membershipData } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', userData.id)
        .single();
      
      // Create a new token for the app
      const appToken = jwt.sign(
        { 
          userId: userData.id,
          email: userData.email,
          role: membershipData?.type || 'Free'
        },
        process.env.JWT_SECRET || 'development-secret-key',
        { expiresIn: '7d' }
      );
      
      // Format membership features
      let features = ['Basic fact-checking'];
      
      if (membershipData?.type === 'Premium') {
        features = [
          'Advanced fact-checking',
          'Unlimited scans',
          'Priority support',
          'Custom reports',
          'AI-powered insights'
        ];
      } else if (membershipData?.type === 'Pro') {
        features = [
          'Advanced fact-checking',
          'Daily scan limit: 50',
          'Standard support',
          'Basic reports'
        ];
      } else {
        features = [
          'Basic fact-checking',
          'Daily scan limit: 10',
          'Community support'
        ];
      }
      
      // Return success with app token and user data
      return res.json({
        success: true,
        token: appToken,
        user: {
          id: userData.id,
          email: userData.email,
          name: profileData?.full_name || userData.email,
          avatar: profileData?.avatar_url,
          membership: {
            type: membershipData?.type || 'Free',
            since: membershipData?.created_at ? new Date(membershipData.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
            features
          }
        }
      });
      
    } catch (verifyError) {
      console.error('Token verification error:', verifyError);
      return res.status(401).json({ 
        success: false, 
        message: 'Token verification failed',
        details: verifyError.message
      });
    }
    
  } catch (error) {
    console.error('Token exchange error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during token exchange',
      details: error.message
    });
  }
};

// Mock implementation for development
function handleMockVerification(token, res) {
  // For development, we'll just decode the token without verification
  const decoded = jwt.decode(token);
  
  if (!decoded) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token format' 
    });
  }
  
  // Create a new app token
  const appToken = jwt.sign(
    { 
      userId: decoded.sub || 'mock-user-id',
      email: decoded.email || 'user@example.com',
    },
    process.env.JWT_SECRET || 'development-secret-key',
    { expiresIn: '7d' }
  );
  
  // Return mock user data
  return res.json({
    success: true,
    token: appToken,
    user: {
      id: decoded.sub || 'mock-user-id',
      email: decoded.email || 'user@example.com',
      name: decoded.user_metadata?.full_name || 'ClarityX User',
      avatar: decoded.user_metadata?.avatar_url || 'https://via.placeholder.com/150',
      membership: {
        type: 'Premium', // For testing, always return Premium
        since: new Date().toLocaleDateString(),
        features: [
          'Advanced fact-checking',
          'Unlimited scans',
          'Priority support',
          'Custom reports',
          'AI-powered insights'
        ]
      }
    }
  });
} 