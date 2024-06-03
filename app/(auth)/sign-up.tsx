import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import React from 'react'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = () => {

    }

    return (
        <SafeAreaView
            className='bg-primary h-full'
        >
            <ScrollView>
                <View
                    className='w-full justify-center min-h-[85vh] px-4 my-6'
                >
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className='w-[115px] h-[35px]'
                    />
                    <Text
                        className='text-white text-2xl font-semibold mt-10 font-psemibold'
                    >
                        Sign Up to Aora
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e: any) => setForm({ ...form, username: e })}
                        otherStyles={`mt-10`}
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: any) => setForm({ ...form, email: e })}
                        otherStyles={`mt-7`}
                        keyboardType='email-address'
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: any) => setForm({ ...form, password: e })}
                        otherStyles={`mt-7`}
                    />
                    <CustomButton
                        title='Sign In'
                        handlePress={submitForm}
                        containerStyle={`mt-7`}
                        isLoading={isSubmitting}
                    />
                    <View
                        className='justify-center pt-5 flex-row gap-2'
                    >
                        <Text
                            className='text-lg text-gray-100 font-pregular'
                        >
                            Have an account already?
                        </Text>
                        <Link
                            className='text-lg text-secondary font-psemibold'
                            href={'sign-in'}
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp