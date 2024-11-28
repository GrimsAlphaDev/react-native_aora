import { Text, View } from 'react-native'
import React from 'react'


type InfoBoxProps = {
    title? : string,
    subtitle? : string,
    containerStyle? : string,
    titleStyles? : string,
}

export default function InfoBox({title, subtitle, containerStyle, titleStyles}: InfoBoxProps) {
    return (
        <View className={containerStyle}>
            <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
            <Text className='text-sm text-gray-100 text-center font-pregular'>
                {subtitle}
            </Text>
        </View>
    )
}
