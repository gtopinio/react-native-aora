import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Post } from '@/lib/interfaces/types'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

interface VideoCardProps {
    video: Post
}

const VideoCard = ({ 
    video : { title, thumbnail, prompt, video, creator: { username, avatar } }
} : VideoCardProps) => {
    const [play, setPlay] = useState(false);
    const [loading, setLoading] = useState(false);

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


    return (
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
                <View // View for the menu
                    className='pt-2'
                >
                    <Image
                        source={icons.menu}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
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
}

export default VideoCard