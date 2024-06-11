import React from 'react'
import TabIcon from '@/components/TabIcon'
import { Tabs } from 'expo-router'
import { icons } from '@/constants'

const tabs = [
    { name: 'home', title: 'Home', icon: icons.home },
    { name: 'create', title: 'Create', icon: icons.plus },
    { name: 'saved', title: 'Saved', icon: icons.bookmark },
    { name: 'profile', title: 'Profile', icon: icons.profile },
]

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622', // Can't use constants here because were in an Object, which doesn't allow for dynamic values
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84,
                    },
                }}
            >
                {tabs.map((tab) => (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={{
                            title: tab.title,
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <TabIcon
                                    icon={tab.icon}
                                    color={color}
                                    name={tab.title}
                                    focused={focused}
                                />
                            )
                        }}
                    />
                ))}
            </Tabs>
        </>
    )
}

export default TabsLayout