import client, { config } from "@/lib/appwrite";
import { PostForm } from "@/lib/interfaces/types";
import { Databases, ID, Query, Storage } from "react-native-appwrite";

const databases = new Databases(client);
const storage = new Storage(client);

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.orderDesc('$createdAt')
            ]
        );

        return posts.documents;
    } catch (error) {
        console.log("Get All Posts Error: ", error);
        throw new Error(String(error));
    }
}

export const getAllTrendingPosts = async () => {
    try {
        const trendingPosts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(7)
            ]
        );

        return trendingPosts.documents;
    } catch (error) {
        console.log("Get All Trending Posts Error: ", error);
        throw new Error(String(error));
    }
}

export const getAllSavedPosts = async (userID: string) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.orderDesc('$createdAt'),
                Query.contains('liked', userID)
            ]
        );

        return posts.documents;
    } catch (error) {
        console.log("Get All Liked Posts Error: ", error);
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

export const getUserPosts = async (userId: string) => {
    try {
        if(!userId) return [];

        const getUser = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.equal('creator', userId),
                Query.orderDesc('$createdAt'),
            ]
        );

        return getUser.documents;
    } catch (error) {
        console.log("Get User Posts Error: ", error);
        throw new Error(String(error));
    }
}

export const getFilePreview = async (fileId: string, type: string) => {
    let fileUrl;

    try {
        if (type === 'video'){
            fileUrl = storage.getFileView(
                config.storageId,
                fileId,
            );
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                config.storageId,
                fileId,
                2000, // width
                2000, // height
                'top' as any, // gravity
                100, // quality
            );
        } else {
            throw new Error("Invalid File Type");
        }

        if (!fileUrl) throw new Error("Invalid File URL");

        return fileUrl;
    } catch (error) {
        console.log("Get File Preview Error: ", error);
        throw new Error(String(error));
    }
}

export const uploadFile = async (file: any, type: string) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
        
    } catch (error) {
        console.log("Upload File Error: ", error);
        throw new Error(String(error));
    }
}

export const createVideoPost = async (
    form: PostForm,
    creatorId: string
) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);

        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                video: videoUrl,
                thumbnail: thumbnailUrl,
                creator: creatorId
            }
        )

        return newPost;
    } catch (error) {
        console.log("Create Video Post Error: ", error);
        throw new Error(String(error));
    }
}