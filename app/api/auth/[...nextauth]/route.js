import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import UserModel from '@/models/User';
import connectDB from '@/db/connectDB';

// Helper function to generate a unique username
const generateUniqueUsername = async (baseUsername, provider) => {
  const providerPrefix = provider.substring(0, 2).toLowerCase(); // 'gi' for github, 'go' for google, etc.
  const uniqueUsername = `${baseUsername}_${providerPrefix}`;
  
  // Check if this username already exists
  await connectDB();
  const existingUser = await UserModel.findOne({ username: uniqueUsername });
  
  if (!existingUser) {
    return uniqueUsername;
  }
  
  // If username exists, add a random suffix
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${uniqueUsername}_${randomSuffix}`;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter both email and password");
        }
        
        await connectDB();
        
        const user = await UserModel.findOne({ 
          email: credentials.email,
          provider: "credentials" 
        });
        
        if (!user) {
          throw new Error("No account found with this email");
        }
        
        // Compare passwords directly (since we're not hashing for now)
        if (credentials.password !== user.password) {
          throw new Error("Invalid password");
        }
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.profilepic,
          provider: "credentials"
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
      }
      if (user) {
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.provider = token.provider;
        session.user.name = token.username || token.name;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        
        if (account.provider === 'credentials') {
          return true;
        }
        
        // Look for existing user with this email AND provider
        let existingUser = await UserModel.findOne({
          email: user.email,
          provider: account.provider
        });
        
        const currentDate = new Date();
        
        if (!existingUser) {
          // Check if user exists with same email but different provider
          const userWithSameEmail = await UserModel.findOne({ email: user.email });
          
          // Create a unique username for this provider
          const baseUsername = user.email.split("@")[0];
          const uniqueUsername = await generateUniqueUsername(baseUsername, account.provider);
          
          // Create new user for this provider
          existingUser = await UserModel.create({
            email: user.email,
            username: uniqueUsername,
            name: user.name || '',
            profilepic: user.image,
            description: "Creating Videos and Content",
            createdAt: currentDate,
            updatedAt: currentDate,
            provider: account.provider,
            providerId: profile.id || account.providerAccountId,
            // If user with same email exists, link the accounts
            linkedAccounts: userWithSameEmail ? [{
              provider: userWithSameEmail.provider,
              providerId: userWithSameEmail.providerId,
              username: userWithSameEmail.username,
              profilepic: userWithSameEmail.profilepic
            }] : []
          });
          
          // If user with same email exists, update their linkedAccounts too
          if (userWithSameEmail) {
            await UserModel.findByIdAndUpdate(userWithSameEmail._id, {
              $push: {
                linkedAccounts: {
                  provider: account.provider,
                  providerId: profile.id || account.providerAccountId,
                  username: uniqueUsername,
                  profilepic: user.image
                }
              }
            });
          }
          
          // Update user's name to the username
          user.name = uniqueUsername;
        } else {
          // Update user's name to the username from the database
          user.name = existingUser.username;
        }
        
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };