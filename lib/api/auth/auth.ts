import client, { config } from "@/lib/appwrite";
import { Alert } from "react-native";
import { Account, Avatars, Databases, ID, Query } from "react-native-appwrite";
import { bugsList } from "../bugs/bugsList";

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
            console.log("Account not created")
            Alert.alert('Error', 'Account not created');
            throw new Error("Account not created");
        } else {
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
        }
        
    } catch (error) {
        const errorParsed = new Error(String(error))

        if (Object.values(bugsList).some(error => errorParsed.message.includes(error))) {
            console.log("Skipping bug error: ", error);
        } else {
            console.log("Create User Error: ", error);
            throw new Error(String(error));
        }
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
        const errorParsed = new Error(String(error))

        if (Object.values(bugsList).some(error => errorParsed.message.includes(error))) {
            console.log("Skipping bug error: ", error);
        } else {
            console.log("Sign In User Error: ", error);
            throw new Error(String(error));
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) {
            console.log("No User Found")
            Alert.alert('Error', 'No User Found');
            throw new Error("No User Found");
        }

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if(!currentUser) {
            console.log("No User Found")
            Alert.alert('Error', 'No User Found');
            throw new Error("No User Found");
        }

        return currentUser.documents[0];
    } catch (error) {
        console.log("Get User Error: ", error);
    }
}