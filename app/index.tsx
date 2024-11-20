import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';


export default function HomeScreen() {
    return (
        <View className='flex-1 items-center justify-center bg-red-400'>
            <Text className="text-3xl">Home Screen Yea Alpha yeehaw </Text>
            <StatusBar style="auto" />
            <Link href="/profile" style={{ color:"blue" }}>Go to Profile</Link>
        </View>
    );
}

