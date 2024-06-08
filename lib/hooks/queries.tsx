import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const queries = (fn: any) => {
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setdata(response as any);
        } catch (error) {
            console.log("Query Data Error: ", error);
            const errorParsed = new Error(String(error));
            Alert.alert('Error', errorParsed.message);
        } finally {
            setIsLoading(false);
        }       
    }

    const refreshData = async () => {
        fetchData();
    }

    return {
        data,
        isLoading,
        refreshData,
    }
}

export default queries;