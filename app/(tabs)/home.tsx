import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants'
import { getAllTrendingPosts, getAllPosts } from '@/lib/api/posts/posts'
import { Post } from '@/lib/interfaces/types'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import queries from '@/lib/hooks/queries'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useFocusEffect } from 'expo-router'

const Home = () => {
    const { data: posts, refreshData: refreshAllPosts } = queries(getAllPosts);
    const { data: trendingPosts, refreshData: refreshTrendingPosts } = queries(getAllTrendingPosts);
    const { user } : any = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false);
    const [postData, setPostData] = useState(null);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshAllPosts();
        await refreshTrendingPosts();
        setRefreshing(false);
    }

    useEffect(() => {
        if (postData) {
            refreshAllPosts();
            refreshTrendingPosts();
        }
    }, [postData])

    useFocusEffect(
        React.useCallback(() => {
            refreshAllPosts();
            refreshTrendingPosts();
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
                        className='my-6 px-4 space-y-6'
                    >
                        <View
                            className='justify-between items-start flex-row mb-6'
                        >
                            <View
                                // Left Child
                            >
                                <Text
                                    className='font-pmedium text-sm text-gray-100'
                                >
                                    Welcome Back
                                </Text>
                                <Text
                                    className='text-2xl font-psemibold text-white'
                                >
                                    {user?.username ?? 'User'}
                                </Text>
                            </View>
                            <View
                                // Right Child
                                className='mt-1.5'
                            >
                                <Image
                                source={images.logoSmall}
                                className='w-9 h-10'
                                resizeMode='contain'
                                />
                            </View>
                        </View>
                        <SearchInput
                            placeholderText='Search for a video topic'
                        />
                        <View
                            // Latest videos section
                            className='w-full flex-1 pt-5 pb-8'
                        >
                            <Text
                                className='text-gray-100 text-lg font-pregular mb-3'
                            >
                                Latest Videos
                            </Text>
                            <Trending
                                posts={trendingPosts ?? []}
                            />
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                        userId={user?.$id}
                        handleUpdate={setPostData}
                    />
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='Be the first to upload a video!'
                        buttonTitle='Create Video'
                        reroute='/create'
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

export default Home