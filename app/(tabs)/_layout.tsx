import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '@/constants'
import { StatusBar } from 'expo-status-bar';

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
                className='w-5 h-5'
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'}`} style={{ color: color, fontSize: 8 }} numberOfLines={1} adjustsFontSizeToFit>
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
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 0.2,
                        borderTopColor: '#232533',
                        height: 45,
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
                            },
                            sceneStyle: {
                                backgroundColor: '#161622'
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
                            },
                            sceneStyle: {
                                backgroundColor: '#161622'
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
                            },
                            sceneStyle: {
                                backgroundColor: '#161622'
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
                            },
                            sceneStyle: {
                                backgroundColor: '#161622'
                            }
                        }}
                    />
            </Tabs>
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}
