import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { icons, images } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { updateSavedPosts } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

type VideoType = {
    $id: string,
    title: string,
    thumbnail: string,
    video: string,
    creator: CreatorType,
    saved: boolean,
}

type CreatorType = {
    avatar: string,
    username: string,
    $id: string
}


export default function VideoCard({ video, bookmarked }: { video: VideoType, bookmarked: boolean }) {


    const globalContext = useGlobalContext();
    if (!globalContext) {
        console.log('Global Context is not available');
        return null;
    }
    const { user } = globalContext;
    const [isLoading, setIsLoading] = useState(false)
    const [play, setPlay] = useState(false)
    const videoRef = React.useRef(null);

    const [isSaved, setIsSaved] = useState<{
        isSaved: boolean
    }>({
        isSaved: video.saved
    })

    const updateSaved = async () => {
        setIsLoading(true);
        console.log('test:', video);
        try {
            await updateSavedPosts(video.$id, user.$id)
            Alert.alert('Success', `Video ${isSaved.isSaved ? 'removed from' : 'added to'} saved`)
        } catch (error) {
            console.error('Error updating saved status:', error)
            Alert.alert('Error updating saved status')
        } finally {
            setIsSaved({ isSaved: !isSaved.isSaved })
            setIsLoading(false)
        }
    }

    return (
        <View className='flex-col items-center px-6 mb-14'>
            {isLoading ? (
                <View className='w-full flex justify-center items-center h-40 rounded-xl '>
                    <Text className='text-gray-400 text-3xl text-center '>Loading...</Text>
                </View>
            ) : (
                <>
                    <View className='flex-row gap-3 items-start'>
                        <View className='justify-center items-center flex-row flex-2'>
                            <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                                <Image
                                    source={{ uri: video.creator.avatar }}
                                    className='w-full h-full rounded-lg'
                                    resizeMode='cover'
                                />
                            </View>
                            <View className='justify-center flex-1 ml-3 gap-y-1'>
                                <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
                                    {video.title}
                                </Text>
                                <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
                                    {video.creator.username}
                                </Text>
                            </View>
                        </View>
                        <View className='pt-2'>
                            {bookmarked && (
                                <TouchableOpacity onPress={updateSaved}>
                                    <Image source={isSaved.isSaved ? icons.heartFilled : icons.heart} className='w-6 h-6 ' resizeMode='contain' />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {play ? (
                        <Video
                            ref={videoRef}
                            source={{ uri: video.video }}
                            style={{ width: 400, height: 300 }}
                            className='w-full h-60 rounded-xl mt-3'
                            resizeMode={ResizeMode.CONTAIN}
                            useNativeControls
                            shouldPlay
                            onPlaybackStatusUpdate={(status) => {
                                if (status.isLoaded) {
                                    if (status.didJustFinish) {
                                        setPlay(false)
                                    }
                                } else if (status.error) {
                                    console.error('Error loading video:', status.error);
                                }
                            }}
                        />
                    ) : (
                        <TouchableOpacity
                            className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                            activeOpacity={0.7}
                            onPress={() => setPlay(true)}>
                            <Image
                                source={{ uri: video.thumbnail }}
                                className='w-full h-full rounded-xl mt-3' resizeMode='cover'
                            />
                            <Image
                                source={icons.play}
                                className='w-12 h-12 absolute' resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )}
                </>
            )}


        </View>
    )
}
