import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import { FlightOfferDataProps } from './(tabs)'

//https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Calendar } from 'react-native-calendars'

const Departuredate = () => {
  const [flightOfferData, setFlightOfferData] = useState<
    Pick<FlightOfferDataProps, 'departureDate'>
  >({
    departureDate: new Date(),
  })

  const saveDepartureDate = async () => {
    try {
      const departureDate = new Date(flightOfferData.departureDate)
      const dateString = departureDate.toISOString().split('T')[0]
      await AsyncStorage.setItem('departureDate', dateString)
      Alert.alert('Success', 'Departure date saved successfully')
    } catch (error) {
      console.log('🚀 ~ saveDepartureDate ~ error:', error)
    }
  }

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
                  Departure Date
                </Text>
              </View>
              <View>
                <Pressable
                  className="h-10 w-10 justify-center items-center"
                  onPress={() => saveDepartureDate()}
                >
                  <Text className="text-white text-lg font-bold">Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        {/* Calender View */}
        <Calendar
          onDayPress={(date: any) => {
            setFlightOfferData((prev) => ({
              ...flightOfferData,
              departureDate: new Date(date.dateString),
            }))
          }}
          markedDates={{
            [flightOfferData.departureDate.toISOString().split('T')[0]]: {
              selected: true,
              selectedColor: '#192031',
              selectedTextColor: 'white',
              disableTouchEvent: true,
            },
          }}
          // Specify style for calendar container element. Default = {}
          style={{
            // borderWidth: 1,
            // borderColor: 'gray',
            height: 350,
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          // theme={{
          //   backgroundColor: '#ffffff',
          //   calendarBackground: '#ffffff',
          //   textSectionTitleColor: '#b6c1cd',
          //   textSectionTitleDisabledColor: '#d9e1e8',
          //   selectedDayBackgroundColor: '#00adf5',
          //   selectedDayTextColor: '#ffffff',
          //   todayTextColor: '#00adf5',
          //   dayTextColor: '#2d4150',
          //   textDisabledColor: '#d9e1e8',
          //   dotColor: '#00adf5',
          //   selectedDotColor: '#ffffff',
          //   arrowColor: 'orange',
          //   disabledArrowColor: '#d9e1e8',
          //   monthTextColor: 'blue',
          //   indicatorColor: 'blue',
          //   textDayFontFamily: 'monospace',
          //   textMonthFontFamily: 'monospace',
          //   textDayHeaderFontFamily: 'monospace',
          //   textDayFontWeight: '300',
          //   textMonthFontWeight: 'bold',
          //   textDayHeaderFontWeight: '300',
          //   textDayFontSize: 16,
          //   textMonthFontSize: 16,
          //   textDayHeaderFontSize: 16,
          // }}
        />
        <View></View>
      </View>
    </View>
  )
}

export default Departuredate
