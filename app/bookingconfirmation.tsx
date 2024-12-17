import { supabase } from '@/lib/supabase'
import { useUserStore } from '@/store/useUserStore'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'

const Bookingconfirmation = () => {
  const [isPending, setIsPending] = useState(false)
  const { user } = useUserStore()

  const flightBookingData = {
    id: 'eJzjsGFtsssd9DTRjR9KjdJ6KyT6QAjr==',
    flightOffers: [
      {
        itineraries: [
          {
            segments: [
              {
                carrierCode: 'CDG-LGV',
                departure: {
                  code: 'CDG',
                },
                arrival: {
                  code: 'LDN',
                },
              },
            ],
          },
        ],
        price: {
          currency: 'EUR',
          grandTotal: '1200',
        },
      },
    ],
  }

  const enrichBookingData = async () => {
    return {
      user_id: user?.id,
      airlinename: 'Air France',
      departurecityname: 'Paris Charles de gaules',
      arrivalcityname: 'London Airport ',
    }
  }
  const saveBookingDataToSupabse = async () => {
    try {
      const enrichedBookingData = await enrichBookingData()
      const { data, error } = await supabase.from('bookings').insert(enrichedBookingData)
      if (error) {
        console.log('🚀 Fail to save booking data', error)
      }
    } catch (err) {
      console.log('🚀 ~ saveBookingDataToSupabse ~ error:', err)
    }
  }
  useEffect(() => {
    if (user?.id) {
      saveBookingDataToSupabse()
    }
  }, [])

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
                <Text className="text-lg text-white font-extrabold">Booking Confirmation</Text>
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: 'center',
            justifyContent: 'center',
            paddingBottom: 200,
          }}
        >
          <View className="w-full px-8 justify-center  items-center py-8 h-full">
            <FontAwesome name="check-circle" size={80} color="#12B3A8" />

            <Text className="text-lg text-center font-semibold">Congratulations, You Ticket Purchage Successfuly completed</Text>
            <View className="w-full py-8 shadow-lg bg-[#12B3A8] rounded-lg px-4 my-4">
              <View>
                <Text className="text-white font-semibold text-lg py-4">{flightBookingData?.id}</Text>
                {flightBookingData.flightOffers.map((flightOffer, index) => (
                  <View key={index} className="">
                    {flightOffer.itineraries.map((itinerary, i) => (
                      <View key={i} className="space-y-4">
                        <View className="mb-6">
                          <Text className="text-5xl font-semibold text-white">{itinerary.segments[0].departure.code}</Text>
                        </View>
                        <View>
                          <Text className="text-white text-5xl font-semibold">{itinerary?.segments[0]?.arrival?.code}</Text>
                        </View>
                        <View>
                          <Text className="text-lg  pt-2 font-semibold text-white">
                            Total: {flightOffer?.price?.currency} {flightOffer.price.grandTotal}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <View className="w-full">
              <Pressable onPress={() => router.replace('/(tabs)')} className="bg-[#12B3A8] rounded-lg justify-center items-center py-3 w-full">
                <Text className="text-white font-bold text-lg py-2"> Go Home</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Bookingconfirmation
