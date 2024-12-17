import { OneWay } from '@/data/one-way'
import { MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'

const Flightdetails = () => {
  const params = useLocalSearchParams<any>()
  const [isPending, setIsPending] = useState(false)

  const { flightOfferPrice } = params
  const parsedFlightOfferPrice = flightOfferPrice && JSON.parse(flightOfferPrice)
  const flightsData = parsedFlightOfferPrice?.flights

  // const formatTime = (time: string) => {
  //   if (!time) return ''
  //   const date = new Date(time)
  //   const options = {
  //     hour12: true,
  //     year: 'numeric',
  //     month: 'numeric',
  //   }

  //   return date.toLocaleTimeString('en-US', {
  //     options,
  //   })
  // }

  const calculateDurationDifference = (departureTime: string, arrivalTime: string) => {
    const departure: any = new Date(departureTime)
    const arrival: any = new Date(arrivalTime)

    const duration = departure - arrival
    const hours = Math.floor((duration % 86400000) / 3600000)
    const minutes = Math.floor((duration % 86400000) % 3600000)

    return `${hours}h ${hours !== 1 ? 's' : ''} ${minutes}min ${minutes !== 1 ? 's' : ''}`
  }

  const calculeTripDuration = (segments: any) => {
    let totalDurationMs = 0
    let totalDurationHours
    let totalDurationMinutes

    for (let i = 0; i <= segments.length; i++) {
      const departureTime = new Date(segments[i].departure.at)
      const arrivalTime = new Date(segments[i].arrival.at)
      const segmentsDurationMs = arrivalTime - departureTime
      totalDurationMs += segmentsDurationMs
    }
    totalDurationHours = Math.floor(totalDurationMs / 3600000)
    totalDurationMinutes = Math.floor(totalDurationMs % 3600000)
    return `${totalDurationHours}hr ${totalDurationHours !== 1 ? 's' : ''} ${totalDurationMinutes}min ${totalDurationMinutes !== 1 ? 's' : ''}`
  }

  return (
    <View className="flex-1 items-center bg-[#F5F7FA]">
      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-[#000000] bg-opacity-50 w-full h-full justify-center items-center opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}

      <View className="w-full h-full">
        <View
          className=" justify-start border-orange-600 w-full bg-[#192031] relative pt-16 pb-8"
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          {/* Header */}
          <View>
            <View className="flex-row gap-4 justify-start items-center px-2">
              <Pressable className="flex-row gap-2 items-center justify-start h-14 w-[20%]" onPress={() => router.back()}>
                <View className="rounded-full bg-gray-500 h-10 w-10 justify-center items-center">
                  <MaterialIcons size={24} name="keyboard-arrow-left" color={'white'} />
                </View>
              </Pressable>
              <View className="w-[60%] justify-center items-center flex-row">
                <Text className="text-lg text-white font-extrabold">Flight Details</Text>
              </View>
              <View>
                {/* <View> */}
                <MaterialCommunityIcons name="dots-horizontal" size={30} color={'white'} />
                {/* </View> */}
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          className="w-full h-full"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 200,
          }}
        >
          <View className="px-4 w-full my-4">
            {/* Heading */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row justify-center items-center">
                <Text className="text-lg justify-center items-center">{flightsData && flightsData[0]?.departure_airport?.id}</Text>
                <Text> - </Text>
                <Text className="text-lg justify-center items-center">{flightsData && flightsData[0]?.arrival_airport?.id}</Text>
              </View>
              <View className="flex-row justify-end items-center">
                <Text className="text-base">Fare Rules</Text>
              </View>
            </View>
            {/* First Flight Details */}
            <View className="py-2 flex-row my-4 justify-between items-start bg-white h-64 shadow-sm  px-4">
              {/* First Section */}
              <View className="w-1/4 justify-between h-full flex-row">
                <View className="h-full justify-between w-3/4  items-end">
                  <View>
                    <Text className="text-gray-500 font-extrabold text-base capitalize text-right">
                      Tuesday , Jul 29
                      {/* {formatTime(
                        flightsData && flightsData[0]?.departure_airport?.time
                      )} */}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-gray-500 font-extrabold text-base capitalize text-right">
                      Tuesday , Jul 30
                      {/* {formatTime(
                        flightsData && flightsData[0]?.departure_airport?.time
                      )} */}
                    </Text>
                  </View>
                </View>

                <View className="w-1/4 justify-center items-center ">
                  <View>
                    <Octicons name="dot-fill" size={24} color="#FF4800" />
                  </View>
                  <View className="border-l-2 border-[#ff4800] h-[70%]" />
                  <View>
                    <Octicons name="dot" size={24} color="#FF4800" />
                  </View>
                  <View className="border-l-2 border-[#ff4800] h-[10%]" />
                </View>
              </View>
              {/* Second Section */}
              <View className="w-2/4 space-y-4 h-full justify-between">
                <View>
                  <Text className="font-extrabold text-base">8:00 AM</Text>
                  <Text className="text-base font-medium">PEK Airtport</Text>
                </View>
                <View>
                  <Text className="text-gray-500 font-extrabold text-base capitalize">
                    {/* Airlines{'\r\n'} Economy M Class */}
                    Airlines
                  </Text>
                  <Text className="text-gray-500 font-extrabold text-base capitalize">Economy M Class</Text>
                </View>
                <View>
                  <Text className="font-extrabold text-base">8:00 PM</Text>
                  <Text className="text-base font-medium">HND Airtport</Text>
                </View>
              </View>
              {/* Third section */}
              <View className="w-1/4 h-full justify-between">
                <View>
                  <Text className="font-extrabold text-base text-right">6X</Text>
                </View>
                <View>
                  <Text className="font-extrabold text-right text-base">12hours 0 min</Text>
                </View>
              </View>
            </View>
            {/* Layover : 2h18 */}
            <View className="flex-row w-full justify-between ">
              <Text className="text-base font-semibold">Layover</Text>
              <Text className="text-base font-semibold">Airport</Text>
            </View>
            {/* Second flight Details */}
            <View className="py-2 flex-row my-4 justify-between items-start bg-white h-64 shadow-sm  px-4">
              {/* First Section */}
              <View className="w-1/4 justify-between h-full flex-row">
                <View className="h-full justify-between w-3/4  items-end">
                  <View>
                    <Text className="text-gray-500 font-extrabold text-base capitalize text-right">
                      Tuesday , Jul 29
                      {/* {formatTime(
                        flightsData && flightsData[0]?.departure_airport?.time
                      )} */}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-gray-500 font-extrabold text-base capitalize text-right">
                      Tuesday , Jul 30
                      {/* {formatTime(
                        flightsData && flightsData[0]?.departure_airport?.time
                      )} */}
                    </Text>
                  </View>
                </View>

                <View className="w-1/4 justify-start items-center ">
                  <View>
                    <Octicons name="dot-fill" size={24} color="#FF4800" />
                  </View>
                  <View className="border-l-2 border-[#ff4800] h-[70%]" />
                  <View>
                    <Octicons name="dot" size={24} color="#FF4800" />
                  </View>
                  {/* <View className="border-l-2 border-[#ff4800] h-[10%]" /> */}
                </View>
              </View>
              {/* Second Section */}
              <View className="w-2/4 space-y-4 h-full justify-between">
                <View>
                  <Text className="font-extrabold text-base">9:00 AM</Text>
                  <Text className="text-base font-medium">LHR Airtport</Text>
                </View>
                <View>
                  <Text className="text-gray-500 font-extrabold text-base capitalize">
                    {/* Airlines{'\r\n'} Economy M Class */}
                    Airlines
                  </Text>
                  <Text className="text-gray-500 font-extrabold text-base capitalize">Economy M Class</Text>
                </View>
                <View>
                  <Text className="font-extrabold text-base">11:00 PM</Text>
                  <Text className="text-base font-medium">CDH Airtport</Text>
                </View>
              </View>
              {/* Third section */}
              <View className="w-1/4 h-full justify-between">
                <View>
                  <Text className="font-extrabold text-base text-right">6X</Text>
                </View>
                <View>
                  <Text className="font-extrabold text-right text-base">2hours 0 min</Text>
                </View>
              </View>
            </View>

            {/* Trip Total */}
            <View className="flex-row w-full justify-between py-8">
              <Text className="text-lg font-semibold">Trip Total</Text>
              <Text className="text-lg font-semibold">14 hrs 0 mins</Text>
            </View>
          </View>
          <View className="flex-row w-full justify-between bg-[#192031] py-4 px-4 items-center">
            <Text className="text-lg font-semibold text-white">$ 123.123</Text>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/travelerdetails',
                  params: {
                    flightOfferPrice: JSON.stringify(OneWay),
                  },
                })
              }
              className="bg-[#12B3A8] rounded-lg px-8 py-3 items-center justify-center"
            >
              <Text className="text-sm font-bold text-white">Continue Booking</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Flightdetails
