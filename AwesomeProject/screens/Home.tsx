/* eslint-disable prettier/prettier */
import { View, Text } from "react-native"; 
import getAllTasks from "../services/getAllTasks";
import { useQuery  } from "react-query";


export default function Home(){
    
    //This is used when page first load to query the data at first
    const {isLoading,error ,data} = useQuery({
        queryKey: ["tasks"],
        queryFn: getAllTasks,
        staleTime: Infinity
    }); 

   
    if(isLoading)return<Text>Wait</Text>;

    if(error)return <Text>{JSON.stringify(error)}</Text>; 

    return<View>
        <Text>home page</Text>
        <Text>All Tasks</Text>
        <Text>
            {JSON.stringify(data)}
        </Text>
    </View>
}