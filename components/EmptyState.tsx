import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type EmptyStateProps = {
    title: string
    subtitle: string
}

import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />
            <Text className='text-xl font-psemibold text-white mt-2'>{title}</Text>
            <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
            <CustomButton title='Create video' handlePress={() => router.push('/create')} containerStyle="w-full my-5" />
        </View>
    )
}