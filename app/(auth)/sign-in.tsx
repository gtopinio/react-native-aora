import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/api/auth/auth'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentUser } from '@/lib/api/auth/auth'
import React from 'react'
import images from '@/constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setIsLoggedIn } : any = useGlobalContext();

    const submitForm = async () => {
        if(!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields')
            return
        }

        setIsSubmitting(true)

        try {

            await signIn(
                form.email,
                form.password
            )

            const result = await getCurrentUser()

            if (!result) {
                console.log("Account not signed in")
                Alert.alert('Error', 'Account does not exist');
                throw new Error("Account not signed in");
            }

            console.log("New User: ", result)

            // Apply Global Context
            setUser(result)
            setIsLoggedIn(true);

            setForm({
                email: '',
                password: '',
            })

            router.replace('home')
            
        } catch (error) {
            const errorParsed = new Error(String(error))
            console.log(error)
            Alert.alert('Error', errorParsed.message)
        }
        finally {
            setIsSubmitting(false)
        }
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
                        Log in to Aora
                    </Text>
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
                            Don't have an account?
                        </Text>
                        <Link
                            className='text-lg text-secondary font-psemibold'
                            href={'sign-up'}
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn