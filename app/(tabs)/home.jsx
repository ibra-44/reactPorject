import { View, Text, FlatList,RefreshControl } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from'../../constants';
import {Tredning} from '../../components/Tredning'
import EmptyState from '../../components/EmptyState';

const Home  = () => {
  const [refreching, setRefreching] = useState(false)
  const onRefresh =async () => { 
    setRefreching(true); 
    //recall video->if any new videos appeard
    setRefreching(false); 
  }
  return (
    <SafeAreaView className ="bg-primary h-full " >
      <FlatList //flatlist is usefull when you want a horizantil and vertical veiw
       data={[{id:1},{id:2},{id:3}]} //here we will put the videos and photos
       keyExtractor={(item)=> item.$id} 
       renderItem={()=>(  
        <Text className="text-3xl text-white ">{item.id}</Text>
      )}
        ListHeaderComponent={()=>( 
          <View className="my-6 px-4 space-y-6" > 
          <View className ="justify-betwenn items-start
          flex-row mb-6">
            <View> 
              <Text className="font-pmedium text-sm
              text-gray-100">
                welcome back
              </Text>
              <Text className ="text-2xl font-psemibold
              text-white"> 
                hello world //add the real name of the useer 
              </Text>
            </View>
            <View className ="my-1.5"> 
              <Image
              source={images.logoSmall} 
              className="w-9 h-10" 
              resizeMode = "contain"
              /> 
            </View>
          </View>

          <SerachInput/> 
          <Veiw className =" w-full flex-1 pt-5 pb-8 "></Veiw>
          <Text className ="text-gray-100 text-lg 
          font-pregular mb-3 "> lates video
           </Text>
           <Tredning posts={[{id:1}, {id:2},{id:3}]??[]}/> 
          </View>

        )}     
        ListEmptyComponent={()=>(
          <EmptyState 
          title="No Videows Found"
          subtitle="be the first one! "/>
        )}  
        refreshControl={<RefreshControl refreshing=
          {refreching} onRefresh={onRefresh}/>}
      /> 
    </SafeAreaView>
  )
}

export default Home 