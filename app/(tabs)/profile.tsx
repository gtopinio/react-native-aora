import { View, Text, FlatList, ActivityIndicator, Touchable, TouchableOpacity, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/lib/interfaces/types';
import { getUserPosts, searchPosts } from '@/lib/api/posts/posts';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } : any = useGlobalContext();

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        console.log(user);
        setIsLoading(true);
        const result = await getUserPosts(user.$id);
        setPosts(result as any);
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

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
                                className='w-full justify-center items-center mt-6 mb-12 px-4'
                            >
                                <TouchableOpacity
                                    className='w-full items-end mb-10'
                                    onPress={logout}
                                >
                                    <Image
                                        source={icons.logout}
                                        resizeMode='contain'
                                        className='w-6 h-6'
                                    />
                                </TouchableOpacity>
                                <View
                                    className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'
                                >
                                    <Image
                                        source={{ uri: user?.avatar }}
                                        className='w-[90%] h-[90%] rounded-lg'
                                        resizeMode='cover'
                                    />
                                </View>

                                <InfoBox
                                    title={user?.username}
                                    containerStyles='mt-5'
                                    titleStyles='text-lg'
                                />
                                <View
                                    className='mt-5 flex-row'
                                >
                                    <InfoBox
                                        title={posts.length || 0}
                                        subtitle='Posts'
                                        containerStyles='mr-10'
                                        titleStyles='text-xl'
                                    />
                                    <InfoBox
                                        title="1.2K"
                                        subtitle='Followers'
                                        titleStyles='text-xl'
                                    />
                                </View>
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
                                subtitle='No videos were found for the current user.'
                            />
                        )}
                    />
                )
            }
        </SafeAreaView>
    )
}

export default Profile