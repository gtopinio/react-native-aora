import client, { config } from "@/lib/appwrite";
import { Account, Avatars, Databases, ID } from "react-native-appwrite";

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
    username: string,
    email: string,
    password: string,
) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) {
            throw new Error("Account not created");
        }

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );

        return newUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
}

export const signIn = async (
    email: string,
    password: string,
) => {
    try {
        const session = await account.createSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
}