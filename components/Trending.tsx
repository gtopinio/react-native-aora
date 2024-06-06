import { View, Text, FlatList } from 'react-native'
import React from 'react'

interface TrendingProps {
    posts: any[]
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