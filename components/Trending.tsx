import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { Post } from '@/lib/interfaces/types'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'

interface TrendingProps {
    posts: Post[]
}

interface TrendingItemProps {
    item: Post
    activeItem: Post
}

const zoomIn : any = {
    0:{
        scale: 0.9
    },
    1:{
        scale: 1
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

    return (
        <Animatable.View
            animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
            duration={500}
            className='mr-5'
        >
            {play ? (
                    <Text
                        className='text-white'
                    >
                        Playing
                    </Text>
            ) : (
                <TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
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
            )
            }
        </Animatable.View>
    )
}

const Trending = ({
    posts
}: TrendingProps) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    return (
        <FlatList
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