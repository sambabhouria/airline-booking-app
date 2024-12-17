import { apiToken } from '@/utils/api-keys'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { FlightOfferDataProps } from './(tabs)'

/**
 *
 * @returns
 * client-id:n1UxnK3xABSYMKAOeZlgTgAaUObFfCoh
 * secreet-id: BacXpxrdD5BnHh0Z
 */
const DestinationScreen = () => {
  const [searchInput, setSearchInput] = useState('')
  const [autoCompleteResults, setAutCompleteResults] = useState([])
  const [flightOfferData, setFlightOfferData] = useState<
    Pick<FlightOfferDataProps, 'destinationLocationCode'>
  >({
    destinationLocationCode: '',
  })
  const [previousSelectedDestination, setPreviousSelectedDestination] =
    useState([])

  const loadPreviousSelectedCities = async () => {
    try {
      const cities = await AsyncStorage.getItem('destinationCities')
      if (cities !== null) {
        setPreviousSelectedDestination(JSON.parse(cities))
      }
    } catch (error) {
      console.log('🚀 ~ loadPreviousSelectedCities ~ error:', error)
    }
  }

  const autoCompleteSearch = async (searchInput: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${apiToken}`,
      }

      const url = `url${'urlPram'} `
      // 'https://www.freetestapi.com/api/v1/airports?search=sin'
      const fakeSearchReacordApiUrl = `https://www.freetestapi.com/api/v1/airports?search=${searchInput}`
      // const response = await axios.get(url, { headers })
      const response = await axios.get(fakeSearchReacordApiUrl)
      const data = response.data

      setAutCompleteResults(data)
    } catch (error) {
      console.log('🚀 ~ autoCompleteSearch ~ Errorr:', error)
    }
  }
  const handleSelectAutocompete = async (item: any) => {
    const previousSelectedCities: any = [...previousSelectedDestination]
    previousSelectedCities.push({ city: item.name, code: item.code })
    await AsyncStorage.setItem(
      'destinationCities',
      JSON.stringify(previousSelectedCities)
    )

    setPreviousSelectedDestination(previousSelectedCities)
    setFlightOfferData({
      ...flightOfferData,
      destinationLocationCode: item.code,
    })
    setSearchInput(`${item.name} (${item.code})`)
    setAutCompleteResults([])
  }

  const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    fn: F,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout | undefined
    return function (...args: Parameters<F>) {
      clearTimeout(timeoutId)

      // timeoutId = setTimeout(() => fn.apply(this, args), delay)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  const debounce0 = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    waitFor: number
  ) => {
    let timeout: NodeJS.Timeout

    const debounced = (...args: Parameters<F>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), waitFor)
    }

    return debounced
  }

  function debounce1<T extends (...args: Parameters<T>) => ReturnType<T>>(
    callback: T,
    wait: number,
    immediate?: boolean
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | undefined

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      const later = () => {
        timeout = undefined
        if (!immediate) callback.apply(this, args)
      }

      const callNow = immediate && timeout === undefined
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) callback.apply(this, args)
    }
  }

  const debouncedSearch = debounce(autoCompleteSearch, 5000)

  const handleInputChange = (text: string) => {
    setSearchInput(text)
    debouncedSearch(text)
  }

  useEffect(() => {
    // getNewAccessToken()
    loadPreviousSelectedCities()
  }, [])

  return (
    <View className="flex-1 items-center bg-[#F5F7FA]">
      <View className="w-full h-full">
        <View
          className=" justify-start border-orange-600 w-full bg-[#192031] relative pt-16 pb-8"
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View>
            {/* Header */}
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
              <View className="w-[60%] justify-normal items-center flex-row">
                <Text className="text-lg text-white font-extrabold">
                  Select Destination
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
        </View>
        {/* Airport or City Search */}
        <View className="w-full py-4 px-4 relative">
          <View className="flex-row justify-between items-center bg-white border-2 border-gray-400 rounded-xl h-14 overflow-hidden">
            <View className="w-full h-full justify-center">
              <TextInput
                placeholder="Search for airport or city"
                placeholderTextColor={'gray'}
                value={searchInput}
                onChangeText={handleInputChange}
                className="bg-transparent text-gray-600 h-full px-2 capitalize"
              />
            </View>
          </View>

          {/* AutoComplete Results */}
          {autoCompleteResults.length > 0 && (
            <View className="border-2 border-gray-400 bg-white rounded-xl shadow-sm mt-4">
              <FlatList
                data={autoCompleteResults}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      onPress={() => handleSelectAutocompete(item)}
                      className="px-2 py-2 rounded-xl my-1"
                    >
                      <Text className="text-gray-500 capitalize">
                        {item.name} ({item.code})
                      </Text>
                    </Pressable>
                  )
                }}
              />
            </View>
          )}

          {/*   Previous Selected Cities */}
          <View className="px-4 w-full">
            <Text className="text-gray-500 text-lg font-bold mt-4">
              Previous Selected Cities
            </Text>
            {previousSelectedDestination.map((city: any, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setFlightOfferData({
                    ...flightOfferData,
                    destinationLocationCode: city.code,
                  })
                  setSearchInput(`${city.city} (${city.code})})`)
                  const item = {
                    name: city.city,
                    code: city.code,
                  }
                  handleSelectAutocompete(item)
                }}
                className="bg-white border-2 border-green-500 rounded-xl px-2 py-3 my-0.5"
              >
                <Text className="text-gray-500 capitalize">
                  {city.city} ({city.code})
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default DestinationScreen
