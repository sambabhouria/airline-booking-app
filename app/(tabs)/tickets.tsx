import BookedTickets from '@/components/BookedTickets'
import { supabase } from '@/lib/supabase'
import { useUserStore } from '@/store/useUserStore'
import { useFocusEffect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

const Tickets = () => {
  const [usersTickets, setUsersTickets] = useState<any>([])
  const { user } = useUserStore()

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
  useFocusEffect(
    useCallback(() => {
      fetchUserBookings()
    }, [])
  )

  return (
    <SafeAreaView style={{ backgroundColor: '#F5F7FA' }}>
      <StatusBar style="dark" />
      <View className="w-full px-4 py-4 items-center justify-between">
        <Text className="text-black font-extrabold text-lg">All tickets</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="h-full"
      >
        <View className="w-full px-4 py-4 items-center justify-between">
          {usersTickets && usersTickets.length > 0 && usersTickets.map((ticket: any) => <BookedTickets key={ticket?.id} item={ticket} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Tickets
