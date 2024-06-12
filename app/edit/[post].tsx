import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { router, useLocalSearchParams } from 'expo-router'
import { createVideoPost, editVideoPost } from '@/lib/api/services/posts'
import { useGlobalContext } from '@/context/GlobalProvider'
import { PostForm } from '@/lib/interfaces/types'

const Edit = () => {
    const [uploading, setUploading] = useState(false);
    const { user } : any = useGlobalContext();
    const { 
        title: postTitle,
        prompt: postPrompt,
        post: postId,
        thumbnail,
        video
    } = useLocalSearchParams();

    const [form, setForm] = useState({
        title: '',
        video: '',
        thumbnail: '',
        prompt: '',
        $id: ''
    } as PostForm);

    const openPicker = async (selectType: 'video' | 'image') => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (selectType === 'video') {
                setForm({ ...form, video: result.assets[0] });
            }
            if (selectType === 'image') {
                setForm({ ...form, thumbnail: result.assets[0] });
            }
        } else {
            setTimeout(() => {
                Alert.alert('Document Picked', JSON.stringify(result, null, 2)); // null means no replacer function, 2 means 2 spaces indentation
            }, 100);
        }
    }

    const submit = async () => {
        if (!form.prompt || !form.title || !form.$id) {
            console.log("Form: ", form);
            return Alert.alert('Error', 'Please fill in all fields');
        }

        setUploading(true);

        try {
            await editVideoPost(
                { ...form },
                user.$id,
            );

            Alert.alert('Success', 'Post edited successfully');
            router.push('/home');
            
        } catch (error) {
            const errorParsed = new Error(String(error));
            console.log("Error uploading post: ", error);
            Alert.alert('Error', errorParsed.message);
            
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: '',
            });

            setUploading(false);
            router.push('/home');
        }
    }

    useEffect(() => {
        setForm({...form, title: postTitle as string, prompt: postPrompt as string, $id: postId as string, thumbnail: { uri: thumbnail as string }, video: { uri: video as string }});
    }, [postTitle, postPrompt, postId, thumbnail, video]);


    return (
        <SafeAreaView
            className='bg-primary h-full'
        >
                {
                    uploading ? (
                        <View
                            className='flex-1 justify-center items-center'
                        >
                            <ActivityIndicator
                                size='large'
                                color='#FFA001'
                            />
                        </View>
                    ) : (
                        <ScrollView // Holds the entire form fields
                            className='px-4 my-6'
                        >
                            <Text
                                className='text-2xl font-psemibold text-white'
                            >
                                Edit Video
                            </Text>

                            <FormField 
                                title='Video Title'
                                value={form.title}
                                placeholder='Give your video a catchy title'
                                handleChangeText={(e) => setForm({ ...form, title: e })} // We spread the form while updating the title
                                otherStyles='mt-10'
                            />

                            <View
                                className='mt-7 space-y-2'
                            >
                                <Text
                                    className='text-base text-gray-100 font-pmedium'
                                >
                                    Upload Video
                                </Text>
                                <TouchableOpacity
                                    onPress={() => openPicker('video')}
                                >
                                    {form.video ? ( 
                                        <Video
                                            source={{ uri: form.video.uri }}
                                            className='w-full h-64 rounded-2xl'
                                            resizeMode={ResizeMode.COVER}
                                        />
                                    ) : (
                                        <View
                                            className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'
                                        >
                                            <View
                                                className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'
                                            >
                                                <Image
                                                    source={icons.upload}
                                                    resizeMode='contain'
                                                    className='w-1/2 h-1/2'
                                                />
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View
                                className='mt-7 space-y-2'
                            >
                                <Text
                                    className='text-base text-gray-100 font-pmedium'
                                >
                                    Thumbnail Image
                                </Text>
                                <TouchableOpacity
                                    onPress={() => openPicker('image')}
                                >
                                    {form.thumbnail ? ( 
                                        <Image
                                            source={{ uri: form.thumbnail.uri }}
                                            className='w-full h-64 rounded-2xl'
                                            resizeMode='cover'
                                        />
                                    ) : (
                                        <View
                                            className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'
                                        >
                                            <Image
                                                source={icons.upload}
                                                resizeMode='contain'
                                                className='w-5 h-5'
                                            />
                                            <Text
                                                className='text-sm text-gray-100 font-pmedium'
                                            >
                                                Choose a File
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <FormField 
                                title='AI Prompt'
                                value={form.prompt}
                                placeholder='Prompt used to generate the video'
                                handleChangeText={(e) => setForm({ ...form, prompt: e })} // We spread the form while updating the title
                                otherStyles='mt-7'
                            />

                            <CustomButton
                                title='Submit & Edit'
                                handlePress={submit}
                                containerStyle='mt-7'
                                isLoading={uploading}
                            />
                        </ScrollView>
                    )
                }
        </SafeAreaView>
    )
}

export default Edit