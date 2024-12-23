import { FlatList,  SafeAreaView, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

export default function Search() {

    const { query } : any = useLocalSearchParams();

    const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

    useEffect(() => {
        refetch();
    }, [query])

    return (
        <SafeAreaView className='bg-primary h-full mt-6'>

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
