import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getSavedPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, Text, View } from "react-native";



export default function Bookmark() {

    const globalContext = useGlobalContext();
    if (!globalContext) {
        console.log('Global Context is not available');
        return null;
    }
    const { user } = globalContext;

    const { data: posts, refetch } = useAppwrite(() => getSavedPosts(user.$id));

    const [refreshing, setrefreshing] = useState(false)

    const onRefresh = async () => {
        setrefreshing(true)
        await refetch();
        setrefreshing(false)
    }

    return (
        <SafeAreaView className="bg-primary h-full mt-11">
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
                                <Text className='text-2xl font-psemibold text-white'>Saved Video</Text>
                            </View>
                            <View className='mt-1.5'>
                            </View>
                        </View>

                    </View>

                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}
