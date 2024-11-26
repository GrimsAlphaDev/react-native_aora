import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants'

type FormInputProps = {
    title: string
    value: string
    handleChangeText: (e: any) => void
    otherStyles?: string
    keyboardType?: string
    placeholder?: string
}

export default function SearchInput({ title, value, handleChangeText, otherStyles, keyboardType, placeholder, ...props }: FormInputProps) {


    return (
        <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>

            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular" value={value} placeholder={placeholder} placeholderTextColor="#7b7b8b" onChangeText={handleChangeText}
            />

            <TouchableOpacity >
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>

        </View>
    )
}
