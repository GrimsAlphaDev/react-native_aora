import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

type PostsType = {
    $id: string,
    title: string,
    thumbnail: string,
    video: string,
    creator: CreatorType,
}

type CreatorType = {
    avatar: string,
    username: string,
}

const zoomIn: Animatable.CustomAnimation = {
    0: {
        scaleX: 0.9,
        scaleY: 0.9,
    },
    1: {
        scaleX: 1.1,
        scaleY: 1.1,
    }
}
const zoomOut: Animatable.CustomAnimation = {
    0: {
        scaleX: 1.1,
        scaleY: 1.1,
    },
    1: {
        scaleX: 0.9,
        scaleY: 0.9,
    }
}


const TrendingItem = ({ activeItem, item }: { activeItem: any, item: PostsType }) => {

    const [play, setPlay] = useState(false)


    const videoRef = React.useRef(null);
    return (
        <Animatable.View className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
            {play ? (
                <Video
                    ref={videoRef}
                    source={{ uri: item.video.toString() }}
                    style={{ width: 200, height: 250 }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded) {
                            if(status.didJustFinish) {
                                setPlay(false)
                            }
                        } else if (status.error) {
                            console.error('Error loading video:', status.error);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <ImageBackground
                        source={{
                            uri: item.thumbnail
                        }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

export default function Trending({ posts }: { posts: PostsType[] }) {


    const [activeItem, setActiveItem] = React.useState(posts[1])

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            horizontal={true}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 10, y: 0 }}
            onViewableItemsChanged={viewableItemsChanged}
        />
    )
}
