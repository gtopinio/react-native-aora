import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Post } from '@/lib/interfaces/types'

interface TrendingProps {
    posts: Post[]
}

const Trending = ({
    posts
}: TrendingProps) => {
    return (
        <FlatList
            horizontal
            data={posts}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => (
                <Text
                    className='text-white'
                >
                    {item.$id}
                </Text>
            )}
        ></FlatList>
    )
}

export default Trending