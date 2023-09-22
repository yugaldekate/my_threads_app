"use server"

import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import Thread from "../models/thread.model";
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
  
      const user = await User.findOne({ id: userId })

      return user;

    }catch(error : any){
        throw new Error(`Failed to fetch user : ${error.message}`);
    }
}

export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();
  
        // Find all threads authored by the user with the given userId
        const threads = await User.findOne({ id: userId })
            .populate({  //users all threads
                path: "threads",
                model: Thread,
                populate:[
                    {
                        path: "children", //for every thread find it childrens
                        model: Thread,
                        populate: {  // for every children of thread find it's author
                            path: "author",
                            model: User,
                            select: "name image id", // Select the "name" and "_id" fields from the "User" model
                        },
                    },
                ]
            });
  
        return threads;
    } catch (error) {
        console.error("Error fetching user threads:", error);
        throw error;
    }
}