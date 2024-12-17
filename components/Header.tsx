import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Header = () => {
  return (
    <View className="flex-row justify-between items-center px-4">
      <View className="w-1/2 flex-row h-14 items-center">
        <View className="pr-2" style={{ paddingRight: 8 }}>
          <View className="overflow-hidden">
            <Image
              style={styles.profile}
              source={require('@/assets/images/profile.png')}
              className="w-12 h-12"
            />
          </View>
        </View>
        <View>
          <Text className="text-base bg-neutral-100 text-white font-medium">
            Welcome Back
          </Text>
          <Text className="text-xl text-white font-bold">Samba ✋</Text>
        </View>
      </View>
      <View className="w-1/2 flex-row space-x-4 justify-end items-center h-14">
        <View
          className="bg-gray-600 w-fit rounded-full px-4 justify-center h-full flex-row items-center "
          style={{
            borderRadius: 9999,
            backgroundColor: '#4b5563',
            height: 50,
            gap: 4,
          }}
        >
          <View
            className="bg-gray-500 rounded-full w-8 h-8 justify-center items-center"
            style={{
              borderRadius: 9999,
              backgroundColor: '#6b7280',
              width: 32,
              height: 32,
            }}
          >
            <Text className="text-white font-semibold">P</Text>
          </View>

          <View className="justify-start items-start gap-1">
            <Text className="text-base text-white ">Flight Point</Text>
            <Text className="text-white"> ✈️ 6,900 </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,

    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
  },
})

export default Header
