import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const Tickets = ({ item, index }: { item: any; index: number }) => {
  const [searchFlightData, setSearchFlightData] = useState<any>(null)

  const formatDuration = (segments: any) => {
    let totalDurationMs = 0

    segments.forEach((segment: any) => {
      if (segment.departure && segment.arrival) {
        const deparureTime: any = new Date(segment.departure.at)
        const arrivalTime: any = new Date(segment.arrival.at)
        const segmentDuraitonMs: any = arrivalTime - deparureTime
        totalDurationMs += segmentDuraitonMs
      }
    })

    const totalDurationHours = Math.floor(totalDurationMs / (1000 * 60 * 60))
    const totalDurationMinutes =
      Math.floor(totalDurationMs % (1000 * 60 * 60)) / (1000 * 60)

    return `${totalDurationHours}hour ${totalDurationHours !== 1 ? 's' : ''}
    ${totalDurationMinutes}minute ${totalDurationMinutes !== 1 ? 's' : ''}
    `
  }

  const formatTime = (time: string) => {
    if (!time) return ''
    return new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  useEffect(() => {
    const fetchSearchFilghtData = async () => {
      try {
        const data = await AsyncStorage.getItem('searchFlightData')
        if (data !== null) {
          setSearchFlightData(JSON.parse(data))
        }
      } catch (error) {
      } finally {
      }
    }
    fetchSearchFilghtData()
    return () => {}
  }, [])

  return (
    <View className="bg-white shadow-sm bg-blend-darken mix-blend-hard-light w-full px-4 py-2 rounded-xl">
      {/* Airline */}
      <View className="justify-between items-center flex-row py-2">
        <View className="w-16">
          <Text>{item?.flight_number}</Text>
        </View>
        <View className="bg-[#12B3A8] rounded-full px-4 py-1 items-center ">
          <Text className="text-xs text-[#1f615d]">Recommended</Text>
        </View>
      </View>

      {/* Arival */}
      <View className="justify-between items-center flex-row py-2 w-full">
        {/* Departure */}
        <View className="w-1/4 items-start flex-row justify-start">
          <Text className="text-sm text-[#6B7386] font-semibold capitalize">
            {searchFlightData && searchFlightData?.originCity}
          </Text>
        </View>

        <View
          className="w-2/4 justify-center items-center"
          style={{ width: '25%' }}
        >
          <Text className="text-sm text-black font-bold">{item.duration}</Text>
        </View>

        <View className="w-1/4 items-start flex-row justify-start">
          <Text className="text-sm text-[#6B7386] font-semibold capitalize">
            {searchFlightData && searchFlightData?.destinationCity}
          </Text>
        </View>
      </View>

      {/* Departure and Arrival  minutes */}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="w-1/3 items-start flex-row gap-1 justify-start">
          <Text>{item?.departure_airport?.id}</Text>
        </View>

        <View className="w-1/3 items-center shadow-sm justify-center">
          <FontAwesome5 name="plane" size={24} color="#12B3A8" />
        </View>

        <View className="w-1/3 items-end flex-row  justify-end">
          <Text>{item?.arrival_airport?.id}</Text>
        </View>
      </View>
      {/* Arrival Time */}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="w-1/3 items-start">
          <Text>{formatTime(item?.departure_airport?.time)}</Text>
        </View>
        <View className="w-1/3 items-center justify-center">
          <Text className="text-lg text-black font-bold">1 Stops</Text>
        </View>
        <View className="w-1/3 items-end">
          <Text>{formatTime(item?.arrival_airport?.time)}</Text>
        </View>
      </View>

      {/* type of ticket*/}
      <View className="justify-between items-center flex-row py-2 w-full relative">
        <View className="py-1 w-1/2 items-center justify-start flex-row">
          <MaterialIcons name="flight-class" size={24} color="#12B3A8" />
          <Text className="text-lg text-black font-bold capitalize">
            {item?.travel_class}
          </Text>
        </View>

        <View className="py-1  items-center flex-row justify-end space-x-1">
          <Text className="text-lg text-[#12B3A8] font-bold">
            EUR {item?.price}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Tickets
