import client, { config } from "@/lib/appwrite";
import { Databases, Query, } from "react-native-appwrite";

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

export const getAllLatestPosts = async () => {
    try {
        const latestPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7)
            ]
        );

        return latestPosts.documents;
    } catch (error) {
        console.log("Get All Latest Posts Error: ", error);
        throw new Error(String(error));
    }
}

export const searchPosts = async (query: string) => {
    try {
        if(!query) return [];

        const searchPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.or(
                    [
                        Query.search('title', query),
                        Query.search('prompt', query)
                    ]
                )
            ]
        );

        return searchPosts.documents;
    } catch (error) {
        console.log("Get Specific Posts Error: ", error);
        throw new Error(String(error));
    }
}