# ClarityX Deployment Guide

This guide will help you deploy ClarityX to Vercel quickly and easily.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [Supabase](https://supabase.com) account with a project set up
3. Google OAuth credentials (for authentication)

## Step 1: Set Up Supabase

1. Create a new Supabase project
2. Go to Authentication → Providers and enable Google Auth
   - Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com)
   - Add your production domain as an authorized redirect URI
3. Note your Supabase URL and anon key from the API settings

## Step 2: Deploy to Vercel

### Option 1: Deploy from GitHub

1. Push your ClarityX code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and click "New Project"
3. Import your GitHub repository
4. Add the following environment variables:
   - `REACT_APP_SUPABASE_URL` (your Supabase project URL)
   - `REACT_APP_SUPABASE_ANON_KEY` (your Supabase anon key)
5. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Add your environment variables:
   ```
   vercel env add REACT_APP_SUPABASE_URL
   vercel env add REACT_APP_SUPABASE_ANON_KEY
   ```

4. Deploy to production:
   ```
   vercel --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. Add your domain in the Vercel project settings
2. Update DNS records as instructed by Vercel
3. Update your Google OAuth redirect URIs with the new domain

## Step 4: Verify Deployment

1. Visit your deployed site
2. Test the login functionality
3. Verify that all features are working as expected

## Troubleshooting

If you encounter issues with your deployment:

1. Check Vercel build logs for errors
2. Verify environment variables are set correctly
3. Ensure Supabase authentication is configured properly
4. Check browser console for client-side errors

For additional support, please contact support@clarityx.info 