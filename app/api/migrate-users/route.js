import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function GET(request) {
  try {
    // This should be protected in production
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    
    // Simple secret check
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    await connectDB();
    
    // Find all users without a provider field
    const users = await User.find({ provider: { $exists: false } });
    
    console.log(`Found ${users.length} users to migrate`);
    
    let migratedCount = 0;
    
    // Update each user with a default provider (github)
    for (const user of users) {
      // Generate a unique username with provider suffix if needed
      let username = user.username;
      
      // Check if the username with provider suffix already exists
      const existingUserWithProviderUsername = await User.findOne({
        username: `${username}_gi`,
        _id: { $ne: user._id }
      });
      
      if (existingUserWithProviderUsername) {
        // Generate a unique username with random suffix
        username = `${username}_gi_${Math.floor(Math.random() * 1000)}`;
      } else {
        username = `${username}_gi`;
      }
      
      // Update the user
      await User.updateOne(
        { _id: user._id },
        { 
          $set: { 
            provider: "github",
            username: username,
            // Add any other defaults
            updatedAt: new Date()
          } 
        }
      );
      
      migratedCount++;
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Migrated ${migratedCount} users`,
      totalUsers: users.length
    });
  } catch (error) {
    console.error("Error migrating users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 