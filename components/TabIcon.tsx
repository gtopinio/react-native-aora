import { Text, View, Image } from 'react-native'
import React from 'react'

interface TabIconProps {
    icon: any,
    color: string,
    name: string,
    focused: boolean,
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text
                className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`}
            >
                {name}
            </Text>
        </View>
    )
}

export default TabIcon