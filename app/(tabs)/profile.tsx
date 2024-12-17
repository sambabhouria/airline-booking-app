import ColorList from '@/components/ColorList'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <View className="w-full px-4 py-4 items-center justify-between">
          <Text className="text-black font-extrabold text-lg">Profile Screen go out here</Text>
        </View>

        <ColorList color="#4f46e5" />
      </View>
    </SafeAreaView>
  )
}

export default Profile
