import { FlatList,  SafeAreaView, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getSavedPosts, searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'

export default function Saved() {

    const globalContext = useGlobalContext();
    if (!globalContext) {
        console.log('Global Context is not available');
        return null;
    }
    const { user } = globalContext;

    const { query } : any = useLocalSearchParams();

    const { data: posts, refetch } = useAppwrite(() => getSavedPosts(user.$id));

    useEffect(() => {
        refetch();
    }, [query])

    return (
        <SafeAreaView className='bg-primary h-full mt-12'>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                        bookmarked={false}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 '>
                        <Text className='font-pmedium text-sm text-gray-100'>Search Result</Text>
                        <Text className='text-2xl font-psemibold text-white'>{query}</Text>

                        <View className='mt-6 mb-8'>
                            <SearchInput
                                initialQuery={query}
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
