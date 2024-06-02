import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import React from 'react'
import images from '@/constants/images'
import FormField from '@/components/FormField'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    return (
        <SafeAreaView
            className='bg-primary h-full'
        >
            <ScrollView>
                <View
                    className='w-full justify-center h-full px-4 my-6'
                >
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className='w-[115px] h-[35px]'
                    />
                    <Text
                        className='text-white text-2xl font-semibold mt-10 font-psemibold'
                    >
                        Log in to Aora
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: any) => setForm({ ...form, email: e })}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: any) => setForm({ ...form, password: e })}
                        otherStyles='mt-7'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn