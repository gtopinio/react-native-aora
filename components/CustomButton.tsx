import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title: string,
    handlePress: () => void,
    containerStyle?: any,
    textStyles?: any,
    isLoading?: boolean,
}

const CustomButton = ({
    title,
    handlePress,
    containerStyle,
    textStyles,
    isLoading,
 } : CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`
                bg-secondary rounded-xl min-h-[62px] justify-center items-center 
                ${containerStyle}
                ${isLoading ? 'bg-opacity-50' : ''}
            `}
            disabled={isLoading}
        >
            <Text
                className={`
                    text-primary text-lg font-psemibold
                    ${textStyles}
                `}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton