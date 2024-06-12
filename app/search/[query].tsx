import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/lib/interfaces/types';
import { searchPosts } from '@/lib/api/posts/posts';
import { useGlobalContext } from '@/context/GlobalProvider';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';

const Search = () => {
    const { user } : any = useGlobalContext();
    const { query } = useLocalSearchParams();
    const [posts, setPosts] = useState([]);
    const [postData, setPostData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        const result = await searchPosts(query as string);
        setPosts(result as any);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [query, postData]);


    return (
        <SafeAreaView
            className="bg-primary h-full"
        >
            {
                isLoading ? (
                    <View
                        className='flex-1 justify-center items-center'
                    >
                        <ActivityIndicator
                            size='large'
                            color='#FFA001'
                        />
                    </View>
                    
                ) : (
                    <FlatList
                        data={posts}
                        keyExtractor={(item: Post) => item.$id.toString()}
                        ListHeaderComponent={() => (
                            <View
                                className='my-6 px-4'
                            >
                                <Text
                                    className='font-pmedium text-sm text-gray-100'
                                >
                                    Search results for
                                </Text>
                                <Text
                                    className='text-2xl font-psemibold text-white'
                                >
                                    {query}
                                </Text>
    
                                <View
                                    className='mt-6 mb-8'
                                >
                                    <SearchInput
                                        initialQuery={query as string}
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
                                subtitle='No videos were found for the search query.'
                                buttonTitle='Go to Home'
                                reroute='/home'
                            />
                        )}
                    />
                )
            }
        </SafeAreaView>
    )
}

export default Search