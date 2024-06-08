import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants'
import { getAllPosts } from '@/lib/api/posts/posts'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import queries from '@/lib/hooks/queries'

const Home = () => {
    const { data: posts, refreshData } = queries(getAllPosts);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshData();
        setRefreshing(false);
    }

    return (
        <SafeAreaView
            className="bg-primary h-full"
        >
            <FlatList
                data={[{ $id: 1 }, { $id: 2 }, { $id: 3} ]}
                // data={[]}
                keyExtractor={(item: any) => item.$id.toString()}
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
                                    Gtopinio
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
                            title=''
                            value=''
                            handleChangeText={() => {}}
                            placeholder='Search for a video topic'
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
                                posts={[ { $id: 1 }, { $id: 2 }, { $id: 3 } ] ?? []}
                            />
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Text
                        className='text-3xl text-white'
                    >
                        {item.$id}
                    </Text>
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

export default Home