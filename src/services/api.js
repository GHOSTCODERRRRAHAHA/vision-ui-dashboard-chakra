/**
 * API Service for ClarityX
 * This file contains all API calls to the backend
 */

// Base API URL - change this to your production API endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.clarityx.info';

// Common headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Generic error handler for API requests
 */
const handleApiError = (error) => {
  // Log the error for debugging
  console.error('API Error:', error);

  // Create a standardized error object
  if (error.response) {
    // Server responded with an error status
    return {
      status: error.response.status,
      message: error.response.data?.message || 'Server error occurred',
      data: error.response.data,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      status: 0,
      message: 'No response from server. Please check your connection.',
      data: null,
    };
  } else {
    // Error setting up the request
    return {
      status: 0,
      message: error.message || 'An unexpected error occurred',
      data: null,
    };
  }
};

/**
 * Helper function to make API requests
 */
const apiRequest = async (endpoint, method = 'GET', data = null, customHeaders = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = { ...defaultHeaders, ...customHeaders };
    
    const config = {
      method,
      headers,
    };

    if (data) {
      if (method === 'GET') {
        // For GET requests, convert data to query params
        const params = new URLSearchParams(data);
        endpoint = `${endpoint}?${params}`;
      } else {
        // For other requests, add data to body
        config.body = JSON.stringify(data);
      }
    }

    // Make the fetch request
    const response = await fetch(url, config);
    
    // Parse the JSON response
    const responseData = await response.json();
    
    // Check if the request was successful
    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: responseData,
        },
      };
    }
    
    return responseData;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * API endpoints
 */
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
    register: (userData) => apiRequest('/auth/register', 'POST', userData),
    refreshToken: () => apiRequest('/auth/refresh-token', 'POST'),
    logout: () => apiRequest('/auth/logout', 'POST'),
  },
  
  // Fact checking endpoints
  factCheck: {
    scanText: (text) => apiRequest('/fact-check/text', 'POST', { content: text }),
    scanLink: (url) => apiRequest('/fact-check/url', 'POST', { url }),
    scanImage: (formData) => apiRequest(
      '/fact-check/image', 
      'POST', 
      formData, 
      { 'Content-Type': 'multipart/form-data' }
    ),
    getHistory: (params) => apiRequest('/fact-check/history', 'GET', params),
    getDetails: (id) => apiRequest(`/fact-check/details/${id}`, 'GET'),
  },
  
  // Global map data
  map: {
    getHotspots: (params) => apiRequest('/map/hotspots', 'GET', params),
    getCountryData: (countryCode) => apiRequest(`/map/country/${countryCode}`, 'GET'),
    getTimelineData: (params) => apiRequest('/map/timeline', 'GET', params),
  },
  
  // User profile and settings
  user: {
    getProfile: () => apiRequest('/user/profile', 'GET'),
    updateProfile: (data) => apiRequest('/user/profile', 'PUT', data),
    getSettings: () => apiRequest('/user/settings', 'GET'),
    updateSettings: (settings) => apiRequest('/user/settings', 'PUT', settings),
  },
  
  // Community features
  community: {
    getPosts: (params) => apiRequest('/community/posts', 'GET', params),
    createPost: (postData) => apiRequest('/community/posts', 'POST', postData),
    getComments: (postId) => apiRequest(`/community/posts/${postId}/comments`, 'GET'),
    addComment: (postId, comment) => apiRequest(`/community/posts/${postId}/comments`, 'POST', { content: comment }),
  },
  
  // Leaderboard
  leaderboard: {
    getLeaderboard: (params) => apiRequest('/leaderboard', 'GET', params),
    getUserRank: (userId) => apiRequest(`/leaderboard/user/${userId}`, 'GET'),
  },
};

/**
 * Mock implementation for development - remove in production
 */
const mockApi = {
  factCheck: {
    scanText: async (text) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random result based on input
      const truthScore = Math.random();
      
      if (truthScore > 0.7) {
        return {
          status: 'true',
          message: 'This claim appears to be factually accurate.',
          sources: [
            { name: 'Official Government Data', url: '#' },
            { name: 'Academic Research', url: '#' }
          ],
          confidence: Math.floor(70 + Math.random() * 30),
          text
        };
      } else if (truthScore > 0.3) {
        return {
          status: 'misleading',
          message: 'This claim is misleading or lacks important context.',
          sources: [
            { name: 'Media Analysis', url: '#' },
            { name: 'Expert Opinion', url: '#' }
          ],
          confidence: Math.floor(60 + Math.random() * 20),
          text
        };
      } else {
        return {
          status: 'false',
          message: 'This claim contains false information.',
          sources: [
            { name: 'Fact-Check Organization', url: '#' },
            { name: 'Primary Source Document', url: '#' }
          ],
          confidence: Math.floor(70 + Math.random() * 20),
          text
        };
      }
    },
    
    scanLink: async (url) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock response
      return {
        status: 'misleading',
        message: 'This article contains some misleading claims mixed with factual information.',
        sources: [
          { name: 'Media Analysis', url: '#' },
          { name: 'Expert Opinion', url: '#' }
        ],
        confidence: 75,
        url
      };
    },
    
    scanImage: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response
      return {
        status: 'false',
        message: 'This image has been manipulated or doctored.',
        sources: [
          { name: 'Image Analysis', url: '#' },
          { name: 'Original Source', url: '#' }
        ],
        confidence: 89
      };
    }
  },
  
  map: {
    getHotspots: async (params) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate random hotspots
      const hotspots = [];
      const categories = ['politics', 'health', 'technology', 'finance', 'climate'];
      
      for (let i = 0; i < 20; i++) {
        hotspots.push({
          id: `spot-${i}`,
          lat: (Math.random() * 180) - 90,
          lng: (Math.random() * 360) - 180,
          intensity: Math.random(),
          category: categories[Math.floor(Math.random() * categories.length)],
          title: `Misinformation Hotspot ${i + 1}`,
          description: 'Sample hotspot for visualization'
        });
      }
      
      return { hotspots, params };
    }
  }
};

/**
 * Website integration with Supabase authentication
 * Provides functions to bridge authentication between this app and the website using Supabase
 */
const websiteAuth = {
  // Login with credentials from the website
  login: async (token, redirectTo = null) => {
    const response = await apiRequest('/auth/website-token', 'POST', { token });
    
    // If successful login and a redirect is specified, navigate to that page
    if (response.success && redirectTo) {
      window.location.href = redirectTo;
    }
    
    return response;
  },
  
  // Verify a token from the website
  verifyToken: async (token) => {
    const customHeaders = { 'Authorization': `Bearer ${token}` };
    return apiRequest('/auth/verify-website-token', 'GET', null, customHeaders);
  },
  
  // Logout and invalidate both systems
  logout: async (redirectToWebsite = false) => {
    // Log out from app system
    const result = await apiRequest('/auth/logout', 'POST');
    
    // Redirect to website logout if requested
    if (redirectToWebsite) {
      const websiteUrl = process.env.REACT_APP_WEBSITE_URL || 'https://clarityx.info';
      window.location.href = `${websiteUrl}/logout`;
    }
    
    return result;
  },
  
  // Generate URL for website login that will redirect back to the app
  getWebsiteLoginUrl: (redirectPath = '/auth/website-login') => {
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || 'https://clarityx.info';
    const appUrl = window.location.origin;
    const redirectUrl = `${appUrl}${redirectPath}`;
    
    return `${websiteUrl}/login?redirect=app&callback=${encodeURIComponent(redirectUrl)}`;
  }
};

// Add the website auth functions to the API object
api.websiteAuth = websiteAuth;

/**
 * Choose which API implementation to use
 */
const useMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';
export default useMockApi ? mockApi : api; 