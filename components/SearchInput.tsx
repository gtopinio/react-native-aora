import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import React from 'react'
import icons from '@/constants/icons'

interface SearchInputProps {
    title: string,
    value: string,
    handleChangeText: (e: any) => void,
    placeholder?: string,
    otherStyles?: string,
    keyboardType?: string,
}

const SearchInput = ({ 
    title,
    value,
    placeholder,
    handleChangeText, 
    otherStyles, 
    keyboardType
}: SearchInputProps) => {

    return (
            <View
                className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex flex-row items-center space-x-4'
            >
                <TextInput
                    className='text-base mt-0.5 text-white flex-1 font-pregular'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7B7B8B'
                    onChangeText={handleChangeText}
                />
                <TouchableOpacity>
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