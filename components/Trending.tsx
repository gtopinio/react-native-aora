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
            data={posts}
            keyExtractor={(item) => item.$id.toString()}
            renderItem={({ item }) => (
                <Text
                        className='text-white text-3xl'
                >
                    {item.$id}
                </Text>
            )}
        ></FlatList>
    )
}

export default Trending