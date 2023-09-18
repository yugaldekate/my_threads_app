"use server"

import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({userId, bio, name, path, username, image}: Params): Promise<void> {
    try {
        connectToDB();
        console.log("inside update user");
        
        await User.findOneAndUpdate(
            { id: userId },
            { username: username.toLowerCase(), name, bio, image, onboarded: true},
            { upsert: true }
        );
  
        if (path === "/profile/edit") {
            revalidatePath(path);  // update the cached data on path
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
      connectToDB();
  
      const threads = await User.findOne({ id: userId })

      return threads;

    }catch(error : any){
        throw new Error(`Failed to fetch user : ${error.message}`);
    }
}