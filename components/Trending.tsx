import { FlatList, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Post } from '@/lib/interfaces/types'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

interface TrendingProps {
    posts: Post[]
}

interface TrendingItemProps {
    item: Post
    activeItem: any
}

const zoomIn : any = {
    0:{
        scale: 0.9
    },
    1:{
        scale: 1.025
    },
}

const zoomOut : any  = {
    0:{
        scale: 1
    },
    1:{
        scale: 0.9
    },
}


const TrendingItems = ({
    item,
    activeItem
}: TrendingItemProps) => {
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
        <Animatable.View
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
            className='mr-5'
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={play}
                    useNativeControls
                    onLoadStart={() => {
                        // This means the video is loading
                        setLoading(true);
                    }}
                    onLoad={() => {
                        // This means the video is ready to play
                        setLoading(false);
                    }}
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
            ) : (
                <TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#FFA001"
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10 absolute'
                />
            )}
        </Animatable.View>
    );
};
const Trending = ({
    posts
}: TrendingProps) => {
    const [activeItem, setActiveItem] = useState(posts[0]);
    const viewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key); // We got the key from the FlatList's keyExtractor
        }
    }

    return (
        <FlatList
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentInset={{x: 170} as any}

            horizontal
            data={posts}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => (
                <TrendingItems
                    activeItem={activeItem}
                    item={item}
                />
            )}
        ></FlatList>
    )
}

export default Trending