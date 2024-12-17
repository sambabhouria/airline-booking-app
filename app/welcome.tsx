import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomeScreen = () => {
  return (
    <SafeAreaView
      className="bg-white flex-1"
      style={{
        backgroundColor: '#1D3D47',
      }}
    >
      <StatusBar style="light" />
      <View className="h-full">
        <View className="w-full px-4 items-center my-8">
          <Animated.View entering={FadeInDown.duration(200).springify()} className="flex-row justify-center items-center pb-24">
            <MaterialCommunityIcons name="airplane" size={24} color={'#12B3A8'} />
            <Text className="text-white text-xl leading-[60px] pl-1">STACKS</Text>

            <Text className="text-[#4AE8DD] text-xl leading-[60px] pl-1 italic">FLY</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(200).springify().delay(200)}>
            <Text className="text-[#fff] text-[52px] font-medium leading-[60px]">Discover your Dream Flight Easily</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(400).springify().delay(400)} className="mt-4">
            <Text className="text-neutral-300 text-lg font-medium leading-[38px]">
              find an easy way to buy airplane tickets with just a few clicks in the application.
            </Text>
          </Animated.View>

          <Animated.View className="h-1/4 w-full justify-start pt-8 px-4" entering={FadeInDown.duration(200).springify().delay(600)}>
            <Pressable onPress={() => router.push('/login')} className="bg-[#12B3A8] rounded-lg  justify-center items-center py-4">
              <Text className="text-white font-bold text-lg">Discover</Text>
            </Pressable>
            <View className="flex-row mt-4 w-full justify-center gap-2">
              <Text className="text-neutral-300 font-medium text-lg leading-[38px] text-center">Don't have an account?</Text>
              <Text className="text-neutral-300 font-semibold text-lg leading-[38px] text-center">Register</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
