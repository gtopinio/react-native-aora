import React from 'react'
import TabIcon from '@/components/TabIcon'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '@/constants'

const tabs = [
    { name: 'home', title: 'Home', icon: icons.home },
    { name: 'bookmark', title: 'Bookmark', icon: icons.bookmark },
    { name: 'create', title: 'Create', icon: icons.plus },
    { name: 'profile', title: 'Profile', icon: icons.profile },
]

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        padding: 2
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