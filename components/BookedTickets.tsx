import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

const BookedTickets = ({ item }: any) => {
  return (
    <View className="bg-white shadow-sm bg-blend-darken mix-blend-hard-light w-full px-4 py-2 rounded-xl mb-6">
      <View className="justify-between items-center flex-row py-2 w-full">
        <View className="w-full items-start flex-row justify-start">
          <Text className="text-xl text-[#6B7386] font-semibold capitalize">{item?.airlinename}</Text>
        </View>
      </View>
      {/* Departure and Arrival AirPort Name */}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="py-1 w-1/2 items-center justify-start flex-row">
          <Text className="text-sm text-[#6B7386] font-bold capitalize">{item?.departurecityname}</Text>
        </View>

        <View className="py-1  items-center flex-row justify-end space-x-1">
          <Text className="text-sm text-[#6B7386] font-bold">{item.arrivalcityname}</Text>
        </View>
      </View>

      {/* Departure and Arrival  airPort Code */}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="w-1/3 items-start flex-row gap-1 justify-start">
          <Text className="font-extrabold">CDG</Text>
        </View>

        <View className="w-1/3 items-center shadow-sm justify-center">
          <FontAwesome5 name="plane" size={24} color="#12B3A8" />
        </View>

        <View className="w-1/3 items-end flex-row  justify-end">
          <Text className="font-extrabold">JFK</Text>
        </View>
      </View>
      {/* Depature and Arrival Time */}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="w-1/3 items-start">
          <Text className="font-bold">8:00 PM</Text>
        </View>
        <View className="w-1/3 items-center justify-center">
          <Text className="text-lg text-black font-bold">1 Stops</Text>
        </View>
        <View className="w-1/3 items-end">
          <Text className="font-bold">11:30 AM </Text>
        </View>
      </View>

      {/* type of ticket*/}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="py-1 w-1/2 items-center justify-start flex-row">
          <MaterialIcons name="flight-class" size={24} color="#12B3A8" />
          <Text className="text-lg text-black font-bold capitalize">Economy</Text>
        </View>

        <View className="py-1  items-center flex-row justify-end space-x-1">
          <Text className="text-lg text-[#12B3A8] font-bold">EUR {1234}</Text>
        </View>
      </View>
    </View>
  )
}

export default BookedTickets
