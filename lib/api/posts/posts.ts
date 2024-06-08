import client, { config } from "@/lib/appwrite";
import { Account, Avatars, Databases, ID, Query } from "react-native-appwrite";

const databases = new Databases(client);

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
        );

        return posts.documents;
    } catch (error) {
        console.log("Get All Posts Error: ", error);
        throw new Error(String(error));
    }
}