import BookedTickets from '@/components/BookedTickets'
import Header from '@/components/Header'
import { OneWay } from '@/data/one-way'
import { supabase } from '@/lib/supabase'
import { useUserStore } from '@/store/useUserStore'
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { router, useFocusEffect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { ArrowPathRoundedSquareIcon, ChevronDoubleRightIcon } from 'react-native-heroicons/outline'

// Trip Options Component
interface TripOptionProps {
  pageNavigation: string
  handleNavigationChange: (type: 'oneWay' | 'roundTrip') => void
}

const TripOption: React.FC<TripOptionProps> = ({ pageNavigation, handleNavigationChange }) => {
  return (
    <View className="flex-row justify-between w-full px-4 py-2">
      <Pressable className="flex-row w-1/2" onPress={() => handleNavigationChange('oneWay')}>
        <View
          className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
            pageNavigation === 'oneWay' ? 'border-b-4 border-[#12B3A8]' : 'border-transparent'
          }`}
        >
          <ChevronDoubleRightIcon
            size={20}
            strokeWidth={pageNavigation === 'oneWay' ? 3 : 2}
            color={pageNavigation === 'oneWay' ? '#12B3A8' : 'gray'}
          />
          <Text
            className={`text-xl pl-2 ${pageNavigation === 'oneWay' ? 'text-[#12B3A8]' : 'text-gray-500'}`}
            style={{
              fontWeight: pageNavigation === 'oneWay' ? '700' : '500',
            }}
          >
            One Way
          </Text>
        </View>
      </Pressable>

      <Pressable className="flex-row w-1/2" onPress={() => handleNavigationChange('roundTrip')}>
        <View
          className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
            pageNavigation === 'roundTrip' ? 'border-b-4 border-[#12B3A8]' : 'border-transparent'
          }`}
        >
          <ArrowPathRoundedSquareIcon
            size={20}
            strokeWidth={pageNavigation === 'roundTrip' ? 3 : 2}
            color={pageNavigation === 'roundTrip' ? '#12B3A8' : 'gray'}
          />
          <Text
            className={`text-xl pl-2 ${pageNavigation === 'roundTrip' ? 'text-[#12B3A8]' : 'text-gray-500'}`}
            style={{
              fontWeight: pageNavigation === 'roundTrip' ? '700' : '500',
            }}
          >
            Round Trip
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

// Location Component
interface LocationInputProps {
  placeholder: string
  icon: React.ReactNode
  value: string
  onPress: () => void
}

const LocationInput: React.FC<LocationInputProps> = ({ placeholder, icon, value, onPress }) => {
  return (
    <View className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center">
      <Pressable onPress={onPress}>
        <View className="px-4 flex-row justify-between items-center">
          <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>
          <View className="w-[80%] py-3 ">
            {value ? (
              <Text className="bg-transparent text-gray-600 font-bold">{value}</Text>
            ) : (
              <Text className="bg-transparent text-lg text-gray-600 font-semibold">{placeholder}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  )
}

interface SearchFlightDataProps {
  originCity: string
  destinationCity: string
  departureDate: string
  seat: number
}

// Departure Date Component
interface DepartureDateProps {
  placeholder: string
  icon: React.ReactNode
  value: string
  onPress: () => void
}

export interface FlightOfferDataProps {
  originLocationCode: string
  destinationLocationCode: string
  departureDate: Date
  returnDate: Date
  adults: number
  maxResults: number
}

const DepartureDate: React.FC<DepartureDateProps> = ({ placeholder, icon, value, onPress }) => {
  return (
    <Pressable onPress={onPress} className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center py-4 flex-row items-center pl-4">
      <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>

      <View className="w-[85%] px-4 items-start justify-start ">
        <Text className="bg-transparent text-gray-600 font-bold">{value || placeholder}</Text>
      </View>
    </Pressable>
  )
}

export default function HomeScreen() {
  const [isPending, setIsPending] = useState<boolean>(false)
  const [refreshData, setRefreshData] = useState(false)
  const [usersTickets, setUsersTickets] = useState<any>([])
  const [pageNavigation, setPageNavigation] = useState<'oneWay' | 'roundTrip'>('oneWay')
  const [session, setSession] = useState(null)
  const { user } = useUserStore()

  const [searchFlightData, setSearchFlightData] = useState<SearchFlightDataProps>({
    originCity: '',
    destinationCity: '',
    departureDate: '',
    seat: 1,
  })

  const [selectedDate, setSelectedDate] = useState(new Date().toDateString())

  const [flightOfferData, setFlightOfferData] = useState<FlightOfferDataProps>({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 1,
    maxResults: 10,
  })

  const handleNavigationChange = (type: 'oneWay' | 'roundTrip') => {
    setPageNavigation(type)
  }

  const handleBackFromPreviousScreen = () => setRefreshData(true)

  const constructSearchUrl = () => {
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, maxResults } = flightOfferData

    // const formattedDepartureDate = new Date(departureDate).toISOString
    const formattedDepartureDate = departureDate.toDateString().replace(/"/g, '')

    // const formattedDepartureDate = departureDate
    //   .toISOString()
    //   .replace(/^"|"$/g, '')

    if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
      Alert.alert('Error', 'Plase fill all required fields')
    }
    return `${'baseUrl'}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${formattedDepartureDate}&max=${maxResults}&adults=${adults}`
  }

  const handleParentSearch = async () => {
    const searchUrl = constructSearchUrl()
    setIsPending(true)
    if (searchUrl) {
      try {
        const response = await axios.get(searchUrl, {
          headers: { Authorization: `Bearer ${'apiToken'}` },
        })
        if (response.data) {
          setIsPending(false)
          await AsyncStorage.setItem('searchFlightData', JSON.stringify(searchFlightData))
          router.push({
            pathname: '/searchresult',
            params: {
              flightOfferData: JSON.stringify(response.data),
            },
          })
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          Alert.alert('Api key expired ', 'Please refresh your API key', [
            {
              text: 'Ok',
              // onPress: () => router.push('/'),
            },
          ])
          setIsPending(false)
        } else {
          setIsPending(false)
          /**juste for fake api dat */
          // Alert.alert(
          //   'Error: ',
          //   'An error occurred while fetching flight data',
          //   [
          //     {
          //       text: 'Ok',
          //     },
          //   ]
          // )

          await AsyncStorage.setItem('searchFlightData', JSON.stringify(searchFlightData))

          router.push({
            pathname: '/searchresult',
            params: {
              flightOfferData: JSON.stringify(OneWay),
            },
          })
        }
      }
    }
  }

  const fetchUserBookings = async () => {
    const { data, error } = await supabase.from('bookings').select('*').eq('user_id', user?.id)

    if (error) {
      console.log('Error fetching user bookings', error)
      return
    }
    if (data) {
      setUsersTickets(data)
    }
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function getCarNames() {
  //       const cars = await AsyncStorage.getAllKeys();
  //       setCarNames(cars);
  //     }
  //     getCarNames();
  //   }, [])
  // );

  useFocusEffect(
    useCallback(() => {
      handleBackFromPreviousScreen()
      fetchUserBookings()
    }, [session])
  )

  useEffect(() => {
    const loadSelectedDestination = async () => {
      try {
        const departureCities = await AsyncStorage.getItem('departureCities')
        const destinationCities = await AsyncStorage.getItem('destinationCities')
        const departureDate = await AsyncStorage.getItem('departureDate')

        if (departureCities !== null) {
          const departureCitiesArray = JSON.parse(departureCities)
          const lastAddedItem = departureCitiesArray[departureCitiesArray.length - 1]

          setSearchFlightData((prev) => ({
            ...prev,
            originCity: lastAddedItem.city,
          }))

          setFlightOfferData((prev) => ({
            ...prev,
            originLocationCode: lastAddedItem.code,
          }))
        }

        if (destinationCities !== null) {
          const destinationCitiesArray = JSON.parse(destinationCities)
          const lastAddedItem = destinationCitiesArray[destinationCitiesArray.length - 1]

          setSearchFlightData((prev) => ({
            ...prev,
            destinationCity: lastAddedItem.city,
          }))

          setFlightOfferData((prev) => ({
            ...prev,
            destinationLocationCode: lastAddedItem.code,
          }))
        }

        if (departureDate !== null) {
          setSelectedDate(departureDate)

          setSearchFlightData((prev) => ({
            ...prev,
            departureDate: departureDate,
          }))

          setFlightOfferData((prev) => ({
            ...prev,
            departureDate: new Date(departureDate),
          }))
        }
      } catch (error) {
        console.log('🚀 ~ loadSelectedDestination ~ error:', error)
      }
    }

    loadSelectedDestination()
    setRefreshData(false)
  }, [refreshData])

  return (
    <View className="flex-1 items-center bg-[#F5F7FA] relative">
      <StatusBar style="light" />
      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-[#000000] bg-opacity-50 w-full h-full justify-center items-center opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}

      {/* Header section */}
      <View
        className="h-64 mb-4 justify-start border-orange-600 w-full bg-[#192031] relative pt-16"
        style={{
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Header />
      </View>
      {/* Form Area */}
      <View className="w-full px-4 -mt-32 mx-4">
        <View className="bg-white rounded-3xl pt-2 pb-4 shadow-md shadow-slate-300 ">
          {/* Trip Options Component */}
          <View className="flex-row justify-between w-full px-4 py-2">
            <TripOption
              pageNavigation={pageNavigation}
              handleNavigationChange={handleNavigationChange}
              // handleNavigationChange={(type: 'oneWay' | 'roundTrip') =>
              //   setPageNavigation(type)
              // }
            />
          </View>
          {/* Origin */}
          <LocationInput
            placeholder={searchFlightData.originCity ? searchFlightData.originCity : 'Departure City'}
            value={searchFlightData.originCity}
            onPress={() => router.push('/departure')}
            icon={<FontAwesome5 size={20} color="gray" name="plane-departure" />}
          />
          {/* Destination*/}
          <LocationInput
            placeholder={searchFlightData.destinationCity ? searchFlightData.destinationCity : 'Destination City'}
            value={searchFlightData.destinationCity}
            onPress={() => router.push('/destination')}
            icon={<FontAwesome5 size={20} color="gray" name="plane-arrival" />}
          />
          {/* Departure Date */}
          <DepartureDate
            placeholder={selectedDate && selectedDate.length > 0 ? selectedDate.replace(/^"|"$/g, '') : 'Departure Date'}
            value={searchFlightData.departureDate.replace(/^"|"$/g, '')}
            onPress={() => router.push('/departuredate')}
            icon={<FontAwesome5 size={20} color="gray" name="calendar-alt" />}
          />

          {/* Seat*/}
          <View className="border-2 border-gray-300 mx-4 rounded-2xl py-3 justify-center flex-row items-start pl-4 ">
            <View className="w-[15%] border-r-2 border-gray-300">
              <MaterialCommunityIcons size={20} color={'gray'} name="seat-passenger" />
            </View>

            <TextInput
              className="w-[85%] text-base px-4 text-gray-800 font-bold "
              value={searchFlightData.seat.toString()}
              onChangeText={(text) => {
                const seatValue = parseInt(text)
                const validSeatValue = isNaN(seatValue) ? 0 : seatValue
                setSearchFlightData((prev) => ({
                  ...prev,
                  seat: validSeatValue,
                }))
                setFlightOfferData((prev) => ({
                  ...prev,
                  adults: validSeatValue,
                }))
                // setSearchFlightData({
                //   ...searchFlightData,
                //   seat: parseInt(text),
                // })
              }}
              placeholder="Seat"
              keyboardType="numeric"
            />
          </View>

          {/* Search Button  */}
          <View className="w-full justify-start pt-2 px-4 mt-4">
            <Pressable className="bg-[#12B3A8] rounded-lg justify-center items-center py-4" onPress={handleParentSearch}>
              <Text className="text-white font-bold text-lg">Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* see  */}
      {/* User Ticket */}
      <View className="w-full py-2 px-8 justify-between  items-center flex-row ">
        <View>
          <Text className="text-lg font-semibold">Active Tickets</Text>
        </View>
        <Pressable onPress={() => router.push('/tickets')} className="items-center justify-center flex-row gap-2">
          <Text className="text-[#12A3B8] font-semibold text-base">See more</Text>
          <Feather name="arrow-right" size={24} color="#12A8B3" />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View className="w-full px-4 py-4 items-center justify-between">
          {usersTickets && usersTickets.length > 0 && usersTickets.map((ticket: any) => <BookedTickets key={ticket?.id} item={ticket} />)}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
