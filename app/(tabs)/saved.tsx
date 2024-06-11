import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { images } from '@/constants'
import { getAllPosts } from '@/lib/api/posts/posts'
import { Post } from '@/lib/interfaces/types'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import queries from '@/lib/hooks/queries'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useFocusEffect } from 'expo-router'

const Saved = () => {
    const { data: posts, refreshData: refreshAllPosts } = queries(getAllPosts);
    const { user } : any = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshAllPosts();
        setRefreshing(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            refreshAllPosts();
        }, [])
    );

    return (
        <SafeAreaView
            className="bg-primary h-full"
        >
            <FlatList
                data={posts}
                keyExtractor={(item: Post) => item.$id.toString()}
                ListHeaderComponent={() => (
                    <View
                        className='my-10 px-4 space-y-6'
                    >
                        <View
                            className='flex-row mb-6'
                        >
                            <Text
                                className='text-2xl font-psemibold text-white'
                            >
                                Saved Videos
                            </Text>
                        </View>
                        <SearchInput
                            placeholderText='Search for your saved videos'
                        />
                    </View>
                )}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='Be the first to upload a video!'
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressBackgroundColor='#FFA001'
                    />
                }
            />
        </SafeAreaView>
    )
}

export default Saved