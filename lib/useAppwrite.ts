import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn:any) => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setisLoading] = useState(true);

    const fetchData = async () => {
        setisLoading(true);
        try {
            const response = await fn();

            setData(response);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "An error occurred while fetching data");
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return {data, isLoading, refetch};
};

export default useAppwrite;