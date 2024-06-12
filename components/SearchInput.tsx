import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import React from 'react'
import icons from '@/constants/icons'
import { router, usePathname } from 'expo-router'

interface SearchInputProps {
    initialQuery?: string
    placeholderText?: string
    userId?: string
}

const SearchInput = ({ 
    initialQuery,
    placeholderText,
    userId
}: SearchInputProps) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || '') // Just like the ngModel in Angular

    const submitSearch = () => {
        if (!query) {
            return Alert.alert('Missing Query', 'Please enter something to search results across the database.');
        }

        const params = userId ? { query, userId } : { query };

        if (pathName.startsWith('/search')) {
            router.setParams(params);
        }
        else {
            const path = userId ? `/search/${query}?userId=${userId}` : `/search/${query}`; // userId + query = saved posts
            router.push(path);
        }
    }

    return (
            <View
                className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex flex-row items-center space-x-4'
            >
                <TextInput
                    value={query}
                    className='text-base mt-0.5 text-white flex-1 font-pregular'
                    placeholder={placeholderText}
                    placeholderTextColor='#CDCDE0'
                    onChangeText={(e) => setQuery(e)}
                    onSubmitEditing={() => {submitSearch()}}
                />
                <TouchableOpacity
                    onPress={() => {submitSearch()}}
                >
                    <Image
                        source={icons.search}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
    )
}

export default SearchInput