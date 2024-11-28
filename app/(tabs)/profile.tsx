import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import { getUserPosts, signOut } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import { router } from 'expo-router'

export default function Profile() {

    const logout = async () => { 
        await signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace('/sign-in');
    }

    const globalContext = useGlobalContext();
    if (!globalContext) {
        console.log('Global Context is not available');
        return null;
    }
    const { user, setUser, setIsLoggedIn } = globalContext;

    const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

    return (
        <SafeAreaView className='bg-primary h-full mt-12'>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
                            <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
                        </TouchableOpacity>

                        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                            <Image source={{ uri: user.avatar }} className='w-[90%] h-[90%] rounded-lg ' resizeMode='cover' />
                        </View>
                        <InfoBox
                            title={user.username}
                            containerStyle='mt-5'
                            titleStyles="text-lg"
                        />

                        <View className='mt-5 flex-row'>
                            <InfoBox
                                title={posts.length || 0}
                                subtitle="Posts"
                                containerStyle='mr-10'
                                titleStyles="text-xl"
                            />
                            <InfoBox
                                title="1.5K"
                                subtitle="Followers"
                                titleStyles="text-xl"
                            />

                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
                )}


            />
        </SafeAreaView>
    )
}
