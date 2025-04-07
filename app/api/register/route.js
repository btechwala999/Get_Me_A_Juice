import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import UserModel from "@/models/User";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if user exists with this email and credentials provider
    const existingUser = await UserModel.findOne({ 
      email,
      provider: "credentials"
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }
    
    // Create base username from email
    let baseUsername = email.split("@")[0];
    let username = baseUsername;
    let counter = 1;
    
    // Keep trying until we find a unique username
    while (await UserModel.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }
    
    try {
      // Create user with the updated model structure
      const newUser = await UserModel.create({
        email,
        name,
        username,
        password,
        description: "Creating Videos and Content",
        provider: "credentials",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return NextResponse.json({
        message: "User registered successfully",
        username: newUser.username
      }, { status: 201 });
    } catch (dbError) {
      console.error("Database error during user creation:", dbError);
      
      // Check if it's a duplicate key error
      if (dbError.code === 11000) {
        if (dbError.keyPattern?.email) {
          return NextResponse.json(
            { message: "Email already registered" },
            { status: 409 }
          );
        }
        if (dbError.keyPattern?.username) {
          return NextResponse.json(
            { message: "Username already taken" },
            { status: 409 }
          );
        }
      }
      
      throw dbError;
    }
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
} 