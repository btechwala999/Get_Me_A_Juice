# Get Me A Juice - Creator Support Platform

A Next.js-based platform that allows creators to receive support from their audience through secure payments. The platform integrates with Razorpay for payment processing and supports multiple authentication methods including GitHub and Google.

## Features

- User Authentication (Email/Password, GitHub, Google)
- Creator Profile Management
- Secure Payment Processing via Razorpay
- Real-time Payment Notifications
- Responsive UI with Tailwind CSS
- MongoDB Database Integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay Account
- GitHub OAuth App
- Google OAuth Credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/get_me_a_juice.git
cd get_me_a_juice
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# Authentication
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Razorpay Configuration
NEXT_PUBLIC_KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

4. Set up your MongoDB connection:
   - For local MongoDB, ensure it's running on the default port (27017)
   - For MongoDB Atlas, update the connection string in `db/connectDB.js`

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

### Authentication
- `GITHUB_ID`: GitHub OAuth App Client ID
- `GITHUB_SECRET`: GitHub OAuth App Client Secret
- `GOOGLE_ID`: Google OAuth Client ID
- `GOOGLE_SECRET`: Google OAuth Client Secret
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js (generate using `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Base URL of your application

### Payment Processing
- `NEXT_PUBLIC_KEY_ID`: Razorpay API Key ID
- `KEY_SECRET`: Razorpay API Secret Key

### Application
- `NEXT_PUBLIC_URL`: Public URL of your application

## Project Structure

```
get_me_a_juice/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── [username]/     # Dynamic user pages
│   └── ...            # Other pages
├── components/         # React components
├── actions/           # Server actions
├── models/            # MongoDB models
├── db/               # Database configuration
├── public/           # Static assets
└── ...              # Configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

