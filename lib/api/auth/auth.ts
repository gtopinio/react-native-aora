import client from "@/lib/appwrite";
import { Account, ID } from "react-native-appwrite";

const account = new Account(client);

export const createUser = (
    username: string,
    email: string,
    password: string,
) => {
    account.create(
        ID.unique(),
        email,
        password,
        username
    ).then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    }
    )
}