import { View, Text } from 'react-native'
import React from 'react'

interface InfoBoxProps {
    title: any,
    subtitle?: any,
    containerStyles?: any,
    titleStyles?: any,
}

const InfoBox = ({
    title,
    subtitle,
    containerStyles,
    titleStyles
}: InfoBoxProps) => {
    return (
        <View
            className={containerStyles}
        >
            <Text
                className={`text-white text-center font-psemibold ${titleStyles}`}
            >
                {title}
            </Text>
            <Text
                className='text-sm text-gray-100 text-center font-pregular'
            >
                {subtitle}
            </Text>
        </View>
    )
}

export default InfoBox