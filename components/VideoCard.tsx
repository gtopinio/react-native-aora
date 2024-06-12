import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import { Post } from '@/lib/interfaces/types'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { deletePost, toggleLikedPost } from '@/lib/api/services/posts'
import { router, usePathname } from 'expo-router'

interface VideoCardProps {
    video: Post,
    userId?: string
    handleUpdate?: any
}

const VideoCard = ({ 
    video : { $id, title, thumbnail, prompt, video, creator: { $id: creatorId, username, avatar }, liked },
    userId,
    handleUpdate
} : VideoCardProps) => {
    const pathName = usePathname();
    const [play, setPlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLikedLoading, setIsLikedLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [menuCoordinates, setMenuCoordinates] = useState({ x: 0, y: 0 });
    const menuIconRef = useRef(null as any);

    const handlePlaybackStatusUpdate = (status: any) => {
        if (status.isPlaying) {
            setPlay(true);
            setLoading(false);
        }
        if (status.didJustFinish) {
            setPlay(false);
            setLoading(false);
        }
    };

    const handleLikePost = async (postId: string, userId: string) => {
        if (isLikedLoading) return;
        try {
            setIsLikedLoading(true);
            await toggleLikedPost(postId, userId);
            const random = Math.floor(Math.random() * 1000);
            handleUpdate && handleUpdate('liked' + random);
        } catch (error) {
            const errorParsed = new Error(String(error));
            console.log("Error Liking Post: ", errorParsed);
            Alert.alert("Error", errorParsed.message);
        } finally {
            setIsLikedLoading(false);
        }
    }

    const handleMenuClick = () => {
        menuIconRef.current.measure((fx: any, fy: any, width: any, height: any, px: any, py: any) => {
            setMenuCoordinates({ x: px, y: py });
            setModalVisible(true);
        });
    };

    const handleEditPost = () => {
        if (!video) {
            return Alert.alert('Missing Post Fields', 'Please refresh the page and try again');
        }
        setModalVisible(false);
        const params = {
            title,
            prompt,
            thumbnail,
            video,
            $id,
        };

        if (!pathName.startsWith('/edit')) { // We're in home apparently
            console.log("Params: ", params);

            const path = `/edit/${$id}?title=${encodeURIComponent(title)}&prompt=${encodeURIComponent(prompt)}&thumbnail=${encodeURIComponent(thumbnail)}&video=${encodeURIComponent(video)}`;
            router.push(path);
        } else { // Else if we're already in the edit page
            console.log("Params: ", params);
            router.setParams(params);
        }
    };

    const handleDeletePost = async () => {
        try {
            setIsDeleting(true);
            await deletePost($id as string);
            setModalVisible(false);
            Alert.alert('Success', 'Post deleted successfully');
            const random = Math.floor(Math.random() * 1000);
            handleUpdate && handleUpdate('deleted' + random);
        } catch (error) {
            const errorParsed = new Error(String(error));
            console.log("Error Deleting Post: ", errorParsed);
            Alert.alert('Error', errorParsed.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
    isDeleting ? (
        <View // Main view for (post details + creator + menu) and video thumbnail
            className='flex-col items-center px-4 mb-14'
        >
            <ActivityIndicator
                size='large'
                color='#FFA001'
            />
        </View>
    ) : (
    <View // Main view for (post details + creator + menu) and video thumbnail
        className='flex-col items-center px-4 mb-14'
    >
        <View // Container for post with creator and menu
            className='flex-row gap-3 items-start'
        >
            <View // View for the avatar and post title
                className='justify-center items-center flex-row flex-1 '
            >
                <View // View for the avatar
                    className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'
                >
                    <Image
                        source={{ uri: avatar }}
                        className='w-full h-full rounded-lg'
                        resizeMode='cover'
                    />
                </View>
                <View // View for post title and creator
                    className='justify-center flex-1 m-3 gap-y-1'
                >
                    <Text
                        className='text-white font-psemibold text-sm'
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text
                        className='text-xs text-gray-100 font-pregular'
                        numberOfLines={1}
                    >
                        {username}
                    </Text>
                </View>
            </View>
            <View // View for the menu and like button
                className='pt-2 flex-row space-x-4'
            >
                <TouchableOpacity
                    onPress={() => handleLikePost($id, userId as string)}
                >
                    {
                        isLikedLoading ? (
                            <ActivityIndicator
                                size="small"
                                color="#FF9C01"
                                className='w-6 h-6'
                            >
                            </ActivityIndicator>
                        ) : (
                            liked.includes(userId as any) ? (
                                <Image
                                    source={icons.heartFilled}
                                    className='w-6 h-6'
                                    resizeMode='contain'
                                />
                            ) : (
                                <Image
                                    source={icons.heart}
                                    className='w-6 h-6'
                                    resizeMode='contain'
                                />
                            )
                        )
                    }
                </TouchableOpacity>
                {
                    userId === creatorId && (
                        <TouchableOpacity
                            onPress={handleMenuClick}
                            ref={menuIconRef}
                        >
                            <Image
                                source={icons.menu}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
                <Modal
                    visible={modalVisible}
                    animationType="fade"
                    transparent={true}
                    >
                        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                            <View className="flex justify-center items-end h-full">
                                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                                    <View
                                        style={{
                                            position: "absolute",
                                            left: menuCoordinates.x - 125,
                                            top: menuCoordinates.y,
                                        }}
                                        className="bg-black-100 w-36 h-40 rounded-lg justify-center items-center"
                                    >
                                    <View 
                                                className='flex-col space-y-4'
                                            >
                                                <TouchableOpacity
                                                    className='w-28 h-10 bg-gray-100 rounded-lg justify-center items-center'
                                                    onPress={handleEditPost}
                                                >
                                                    <Text
                                                        className='text-black-100 font-psemibold text-sm'
                                                    >
                                                        Edit Post
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    className='w-28 h-10  bg-gray-100 rounded-lg justify-center items-center'
                                                    onPress={handleDeletePost}
                                                >
                                                    <Text
                                                        className='text-black-100 font-psemibold text-sm'
                                                    >
                                                        Delete Post
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
            </View>
        </View>

        {play ? (
            <>
                <Video
                    source={{ uri: video }}
                    className='w-full h-60 rounded-xl'
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={play}
                    useNativeControls
                    onLoadStart={() => {
                        setLoading(true);
                    }}
                    onLoad={() => {
                        setLoading(false);
                    }}
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
                {loading && (
                    <ActivityIndicator
                            size="large"
                            color="#FFA001"
                            className='w-full h-60 rounded-xl mt-3 absolute justify-center items-center'
                    />
                )}
            </>
        ) : (
            // Video Thumbnail to play instead of regular button
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {setPlay(true)}} // Use callback function instead of passing the result of the function being passed
                className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
            >
                <Image
                    source={{ uri: thumbnail }}
                    className='w-full h-full rounded-xl mt-3'
                    resizeMode='cover' // Cover since the thumbnail dimensions may be smaller than the container; Hence, we want to ensure no spaces are visible (from the container) using cover
                />
                <Image
                    source={icons.play}
                    className='w-12 h-12 absolute' // Absolute so that it's positioned as an overlay on the thumbnail, instead of the container handling it like it has more than one child (i.e., flexbox behavior)
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}
    </View>
        )
    )
}

export default VideoCard