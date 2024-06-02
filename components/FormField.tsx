import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import React from 'react'
import icons from '@/constants/icons'

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
                    secureTextEntry={title === 'Password' ? !setshowPassword : false} // Users want to hide their password (i.e., showPassword should be false). Thus, we use the NOT operator (!) since secureTextEntry is only triggered with true, which is only obtained when showPassword is false (!(false) = true)
                />
                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setSetshowPassword(!setshowPassword)}
                    >
                        <Image
                            source={setshowPassword ? icons.eye : icons.eyeHide}
                            resizeMode='contain'
                            className='w-6 h-6'
                        />
                    </TouchableOpacity>
                
                )}
            </View>
        </View>
    )
}

export default FormField