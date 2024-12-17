import HeaderSearchResult from '@/components/HeaderSearchResult'
import Tickets from '@/components/Tickets'
import { OneWay } from '@/data/one-way'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'

const SearchResult = () => {
  const params = useLocalSearchParams<any>()
  const { flightOfferData } = params
  const [isPending, setIsPending] = useState(false)
  const parsedFlightOfferData = JSON.parse(flightOfferData)

  const handlePricingRequest = async (item: any) => {
    setIsPending(true)
    try {
      const response = await axios.post(
        'https://api.amadeus.com/v1/shopping/flights-offers/pricing?include=detailed-fare-rules',
        {
          data: { type: 'flight-offers-pricing', flightOffers: [item] },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorizaton: `Bearer${'apikey'}`,
          },
        }
      )
      setIsPending(false)
      const flightOfferPrice = response.data
      router.push({
        pathname: '/flightdetails',
        params: { flightOfferPrice: JSON.stringify(flightOfferPrice) },
      })
    } catch (error) {
      console.log('🚀 ~ handlePricingRequest ~ error:', error)
      setIsPending(false)

      router.push({
        pathname: '/flightdetails',
        params: { flightOfferPrice: JSON.stringify([]) },
      })
    }
  }

  const handleUpsetRequest = async (item: any) => {
    try {
      setIsPending(true)
      const requestBody = {
        data: {
          type: 'flight-offers-upselling',
          flightOffers: [item],
          payments: [
            {
              brand: 'VSA_IXARIS',
              binNumber: '1234',
              flightOfferIds: [1],
            },
          ],
        },
      }
      const apiURL = 'https://test.api'
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorizaiton: `Bearer ${'api'}`,
        },
        body: JSON.stringify(requestBody),
      }
      const response: any = await fetch(apiURL, requestOptions)
      const responseData = await response.json()
      const flightOfferData = responseData.data
      if (response.ok) {
        setIsPending(false)
        router.push({
          pathname: '/brandedupsell',
          params: {
            flightOfferData: JSON.stringify(flightOfferData),
          },
        })
      }
      if (
        (response.errors && response.errors[0].code === 39397) ||
        responseData.errors[0].code === 4926
      ) {
        console.log('No upsell offers found .Try pricing request')
        handlePricingRequest(item)
      }
    } catch (error) {
      // This is just for testing api non fetching
      // going to shwo all flight details if non upsell offers found
      setIsPending(false)
      router.push({
        pathname: '/flightdetails',
        params: { flightOfferPrice: JSON.stringify(OneWay) },
      })
      // TODO: if upsell exists we are going to call this

      /**
       * JUST FOR TEST TESTGING
       */

      // router.push({
      //   pathname: '/brandedupsell',
      //   params: {
      //     flightOfferData: JSON.stringify(OneWay),
      //   },
      // })
      // router.push({
      //   pathname: '/brandedupsell',
      //   params: {
      //     flightOfferData: JSON.stringify([]),
      //   },
      // })
    }
  }

  const renderFlightOffer = (item: any, index: number) => (
    <Pressable
      key={index}
      onPress={() => handleUpsetRequest(item)}
      className="mb-8"
    >
      <Tickets index={index} item={item} />
    </Pressable>
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
              <Pressable
                className="flex-row gap-2 items-center justify-start h-14 w-[20%]"
                onPress={() => router.back()}
              >
                <View className="rounded-full bg-gray-500 h-10 w-10 justify-center items-center">
                  <MaterialIcons
                    size={24}
                    name="keyboard-arrow-left"
                    color={'white'}
                  />
                </View>
              </Pressable>
              <View className="w-[60%] justify-center items-center flex-row">
                <Text className="text-lg text-white font-extrabold">
                  Search Results
                </Text>
              </View>
              <View>
                {/* <View> */}
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={30}
                  color={'white'}
                />
                {/* </View> */}
              </View>
            </View>
          </View>
          {/* Header Search Result  */}
          <HeaderSearchResult />
        </View>
        <ScrollView
          className="w-full"
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View className="w-full py-2 justify-between items-center">
            <View>
              <View className="w-full px-4 py-2 flex-row justify-between items-center">
                <View className="flex-row justify-center items-center">
                  <Text className="text-lg font-semibold">Search Result</Text>
                </View>
                <View className="flex-row justify-center items-center">
                  <Text className="text-[#6B7386] font-semibold text-base">
                    {parsedFlightOfferData?.flights?.length} Results
                  </Text>
                </View>
              </View>
            </View>

            <View className="w-full">
              <View className="h-18 w-full px-4 space-y-4">
                {parsedFlightOfferData?.flights?.map(renderFlightOffer)}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default SearchResult
