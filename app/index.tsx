import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';


export default function HomeScreen() {
    return (
        <View className='flex-1 items-center justify-center white'>
            <Text className="text-3xl font-pblack">Aura </Text>
            <StatusBar style="auto" />
            <Link href="/home" style={{ color: "blue" }}>
        <Text>Go to Home</Text>
      </Link>
        </View>
    );
}

