"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"
import UserModel from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()

    let user = await UserModel.findOne({ username: to_username })
    const secret = user.razorpaysecret

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x
}

export const fetchuser = async (username, provider = null) => {
    if (!username) {
        console.log("fetchuser called with no username");
        return null;
    }
    
    try {
        await connectDB();
        
        // First try to find by username and provider if provider is specified
        let user = null;
        if (provider) {
            user = await UserModel.findOne({ username, provider });
        }
        
        // If not found and provider was specified, try without provider
        if (!user && provider) {
            user = await UserModel.findOne({ username });
        }
        
        // If still not found, try one last time with just the username
        if (!user) {
            user = await UserModel.findOne({ username });
        }
        
        console.log("User lookup result:", {
            username,
            provider,
            found: !!user,
            userProvider: user?.provider
        });
        
        return user ? user.toObject({ flattenObjectIds: true }) : null;
    } catch (error) {
        console.error("Error in fetchuser:", error);
        return null;
    }
}

export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return p
}

export const updateProfile = async (data, oldusername, provider = null) => {
    try {
        await connectDB();
        
        // Convert FormData to object
        const formData = Object.fromEntries(data);
        console.log("Updating profile with data:", formData);
        
        // Create the query for finding the user
        const query = { username: oldusername };
        if (provider) {
            query.provider = provider;
        }
        
        // Find the existing user
        const existingUser = await UserModel.findOne(query);
        if (!existingUser) {
            console.error("User not found:", oldusername);
            return { success: false, error: "User not found" };
        }
        
        // Prepare update data
        const updateData = {
            ...formData,
            updatedAt: new Date()
        };
        
        // If username is being changed
        if (formData.username && formData.username !== oldusername) {
            // Check if new username exists
            const usernameExists = await UserModel.findOne({ username: formData.username });
            if (usernameExists) {
                return { success: false, error: "Username already exists" };
            }
            
            // Update username in payments
            await Payment.updateMany(
                { to_user: oldusername },
                { to_user: formData.username }
            );
            
            // If this user has linked accounts, update those references too
            if (existingUser.linkedAccounts && existingUser.linkedAccounts.length > 0) {
                // For each linked account, update the reference to this account
                for (const linkedAccount of existingUser.linkedAccounts) {
                    await UserModel.updateOne(
                        { username: linkedAccount.username },
                        { 
                            $set: {
                                "linkedAccounts.$[elem].username": formData.username
                            }
                        },
                        { 
                            arrayFilters: [{ "elem.username": oldusername }]
                        }
                    );
                }
            }
        }
        
        // Update the user document
        const result = await UserModel.updateOne(
            query,
            { $set: updateData }
        );
        
        console.log("Update result:", result);
        
        if (result.modifiedCount === 0) {
            console.warn("No changes were made to the user document");
        }
        
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: error.message };
    }
}