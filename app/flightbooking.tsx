import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'

const Flightbooking = () => {
  const params = useLocalSearchParams<any>()
  const { flighPricingData, travelerData } = params
  const [isPending, setIsPending] = useState(false)
  const parsedTravelerData: any = JSON.parse(travelerData)
  const flightParicingData: any = JSON.parse(flighPricingData)

  const confirmBooking = () => {
    // setIsPending(true)
    //Here usually we post data to  the server to create booking but for test just redirect to confrim booking

    router.push({
      pathname: '/bookingconfirmation',
      params: {
        bookingData: '',
      },
    })
  }

  const renderText = (label: string, value: string) => (
    <View key={label} className="items-start w-full">
      <Text className="capitalize font-extrabold text-lg py-2 ">{label}</Text>
      <View className="py-2 border-2 border-gray-500 rounded-lg w-full px-2">
        <Text className="font-bold text-base w-full">{value}</Text>
      </View>
    </View>
  )
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
                <Text className="text-lg text-white font-extrabold">Booking Screen</Text>
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
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: 'center',
            justifyContent: 'center',
            paddingBottom: 80,
          }}
        >
          <View className="w-full px-4 py-4">
            <Text className="text-xl font-bold">Traveller Details</Text>
            <View className="justify-between items-center">
              {renderText('Gender', parsedTravelerData?.gender)}
              {renderText('First Name', parsedTravelerData?.name?.firstName)}
              {renderText('Last Name', parsedTravelerData?.name?.lastName)}
              {renderText('Email', parsedTravelerData?.contact?.emailAddress)}
              {renderText('Phone Number', parsedTravelerData?.contact?.phones[0]?.number)}
              {renderText('Date Of Birth', parsedTravelerData?.dateOfBirth)}
              {renderText('Birth Place', parsedTravelerData?.documents[0]?.birthPlace)}
              {renderText('Document Type', parsedTravelerData?.documents[0]?.documentType)}
              {renderText('Passport Expire Date', parsedTravelerData?.documents[0]?.expiryDate)}
              {renderText('Passport Issuance Country', parsedTravelerData?.documents[0]?.issuanceCountry)}
              {renderText('Passport Issuance Date', parsedTravelerData?.documents[0]?.issuanceDate)}
              {renderText('Passport Issuance Location', parsedTravelerData?.documents[0]?.issuanceLocation)}
              {renderText('Issuance Nationaliy', parsedTravelerData?.documents[0]?.nationality)}
              {renderText('Document number', parsedTravelerData?.documents[0]?.number)}
            </View>
            <View className="w-full py-4 px-4">
              <Pressable onPress={confirmBooking} className="bg-[#12B3A8] rounded-lg justify-center items-center py-4 w-full">
                <Text className="text-white font-bold text-lg">Confirm Booking</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Flightbooking
