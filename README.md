# ClarityX Dashboard

ClarityX is a dashboard application for fact-checking and misinformation analysis, providing tools to verify claims, track verification history, and engage with a community of truth-seekers.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/clarityx-dashboard.git
   cd clarityx-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local` and update with your Supabase credentials
   - You'll need a Supabase project set up with authentication enabled

4. Start the development server:
   ```
   npm start
   ```
   
5. Build for production:
   ```
   npm run build
   ```

## 📱 Features

- **Google Authentication**: Secure login with Google OAuth
- **Dashboard Overview**: Analytics and insights on fact-checking activities
- **Scan Tool**: Analyze content for misinformation
- **Community View**: Engage with other fact-checkers
- **History Tracking**: Review past fact-checks and verifications
- **Profile Management**: Update your verification expert profile
- **Leaderboard**: See top fact-checkers in the community

## 🔧 Configuration

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Google authentication in the Auth settings
3. Copy your project URL and anon key to your `.env.local` file

### Deployment

This project is configured for deployment on Vercel:

1. Push your repository to GitHub
2. Import into Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy!

## 📚 Tech Stack

- React
- Chakra UI
- Three.js for visualizations
- Supabase for authentication and database

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@clarityx.info or open an issue on the GitHub repository.
