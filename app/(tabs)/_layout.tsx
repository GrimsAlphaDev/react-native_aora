import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '@/constants'

interface TabIconProps {
    icon: any;
    color: string;
    name: string;
    focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
    return (
        <View className='items-center justify-center gap-1 mt-4'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} numberOfLines={1}  >
                {name}
            </Text>
        </View>
    )
}

export default function TabsLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 50,
                    }
                }}>
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused} />;
                        }
                    }}
                />
                <Tabs.Screen
                    name='bookmark'
                    options={{
                        title: 'Bookmark', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Bookmark"
                                focused={focused} />;
                        }
                    }}
                />
                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'Create', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused} />;
                        }
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'Profile', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused} />;
                        }
                    }}
                />
            </Tabs >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})