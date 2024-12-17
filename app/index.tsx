import { useUserStore } from '@/store/useUserStore'
import { Redirect } from 'expo-router'
import React from 'react'

const Indx = () => {
  const { session } = useUserStore()
  if (!session) {
    return <Redirect href="/welcome" />
  }

  return <Redirect href="/(tabs)" />
}

export default Indx
