import { View, Text, TextInput } from 'react-native'
import { useState } from 'react'
import React from 'react'

interface FormFieldProps {
    title: string,
    value: string,
    handleChangeText: (e: any) => void,
    placeholder?: string,
    otherStyles?: string,
    keyboardType?: string,
}

const FormField = ({ 
    title,
    value,
    placeholder,
    handleChangeText, 
    otherStyles, 
    keyboardType
}: FormFieldProps) => {
    const [setshowPassword, setSetshowPassword] = useState(false)

    return (
        <View
            className={`space-y-2 ${otherStyles}`}
        >
            <Text
                className='text-base text-gray-100 font-pmedium'
            >
                {title}
            </Text>
            <View
                className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary flex flex-row items-center'
            >
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7B7B8B'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' ? !setshowPassword : false}
                />
            </View>
        </View>
    )
}

export default FormField