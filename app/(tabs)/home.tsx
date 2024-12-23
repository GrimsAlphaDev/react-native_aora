import { Alert, FlatList, Image, RefreshControl, SafeAreaView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'

export default function Home() {

  const globalContext = useGlobalContext();
  if (!globalContext) {
      console.log('Global Context is not available');
      return null;
  }
  const { user } = globalContext;
  const {data: posts, refetch} = useAppwrite(() => getAllPosts(user.$id));
  const {data: latestPosts} = useAppwrite(getLatestPosts)

  const [refreshing, setrefreshing] = useState(false)

  const onRefresh = async () => {
    setrefreshing(true)
    // re call videos -> if any new videos are added
    await refetch();
    setrefreshing(false)
  }



  return (
    <SafeAreaView  className='bg-primary h-full mt-11'>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            bookmarked={true}
            refetch={refetch}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome Back,</Text>
                <Text className='text-2xl font-psemibold text-white'>{user.username}</Text>
              </View>
              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
              </View>
            </View>

            <SearchInput title='Search' keyboardType='default' placeholder='Search for a video topic' value='' handleChangeText={(e) => { }}/>

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>

              <Trending posts={latestPosts} />

            </View>

          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
    </SafeAreaView>
  )
}
