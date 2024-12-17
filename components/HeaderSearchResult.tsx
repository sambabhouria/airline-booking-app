import { Feather, Octicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const HeaderSearchResult = () => {
  const [searchFlightData, setSearchFlightData] = useState<any>(null)
  const originCity = searchFlightData?.originCity || ''
  const destinationCity = searchFlightData?.destinationCity || ''
  const seats = searchFlightData?.seat || 0
  const departureDate = searchFlightData?.departureDate || ''
  const adults = searchFlightData?.adults || 1
  const formattedDepartureDate = departureDate?.replace(/['"]+/g, '')

  useEffect(() => {
    const fetchSearchFilghtData = async () => {
      try {
        const data = await AsyncStorage.getItem('searchFlightData')
        if (data !== null) {
          setSearchFlightData(JSON.parse(data))
        }
      } catch (error) {
        console.log('🚀 ~ fetchSearchFilghtData ~ error:', error)
      } finally {
      }
    }
    fetchSearchFilghtData()
    return () => {}
  }, [])

  return (
    <>
      {searchFlightData && (
        <View>
          <View className="flex-row justify-center items-center px-2 w-full">
            <View className="w-[80%] justify-between items-center flex-row pb-2 px-2">
              <Text className="text-lg text-white font-extrabold capitalize">
                {originCity}
              </Text>
              <Feather name="arrow-right" size={24} color="white" />

              <Text className="text-lg text-white font-extrabold capitalize">
                {destinationCity}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center items-center px-2 w-full">
            <View className="w-[80%] justify-between items-center flex-row">
              <Text className="text-sm text-gray-500 font-extrabold">
                {formattedDepartureDate}
              </Text>
              <Octicons name="dot-fill" size={10} color={'white'} />
              <Text className="text-sm text-gray-500 font-extrabold">
                {seats} Seats
              </Text>
              <Octicons name="dot-fill" size={10} color={'white'} />
              <Text className="text-sm  text-gray-500 font-extrabold">
                Economy
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  )
}

export default HeaderSearchResult
