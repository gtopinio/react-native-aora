import { Client } from 'react-native-appwrite';
export const config = { // AppWrite configuration
    endpoint: 'https://cloud.appwrite.io/v1',
    platform : 'com.gtopinio.aora',
    projectId: '665d63d5000755cc7ff1',
    databaseId: '665d667d00236e58b804',
    userCollectionId: '665d669b0006cad8242d',
    videoCollectionId: '665d66b1003d5bc43755',
    storageId: '665d682b0020218edaca',   
}

// Init React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

export default client;