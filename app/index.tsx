import { Image, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { Redirect, router } from 'expo-router';


export default function HomeScreen() {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full items-center min-h-[85vh] justify-center px-4'>
                    <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
                    <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />

                    <View className='mt-5 relative'>
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless {'\n'} Possibilities with <Text className='text-secondary-200'>Aora</Text>
                        </Text>

                        <Image
                            source={images.path}
                            className='w-[136px] h-[15px] mt-16 -right-8 absolute' resizeMode='contain'
                        />
                    </View>

                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
                        Where creativity meets innovation: Embark on a journey of limitless exploration with Aora
                    </Text>

                    <CustomButton containerStyle="w-full mt-7" title='Continue with Email' handlePress={() => router.push('/sign-in')} />
                </View>
            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light' />

        </SafeAreaView>
    );
}

