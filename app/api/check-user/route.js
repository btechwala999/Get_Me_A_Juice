import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    // Allow checking by provider if specified
    const provider = searchParams.get("provider");
    
    if (!username) {
      return NextResponse.json({ exists: false }, { status: 400 });
    }
    
    await connectDB();
    
    // Query options - find by username
    const query = { username };
    // If provider is specified, include it in the query
    if (provider) {
      query.provider = provider;
    }
    
    const user = await User.findOne(query);
    
    if (user) {
      return NextResponse.json({ 
        exists: true,
        username: user.username,
        provider: user.provider
      });
    }
    
    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 