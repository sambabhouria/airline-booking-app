// https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
// https://supabase.com/docs

// https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
// https://docs.expo.dev/guides/using-supabase/
//https://supabase.com/dashboard/projects

// https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?utm_source=expo&utm_medium=referral&utm_term=expo-react-native
// https://supabase.com/docs/guides/auth/social-login/auth-apple?platform=react-native&utm_source=expo&utm_medium=referral&utm_term=expo-react-native
// https://supabase.com/docs/guides/auth/social-login/auth-google?platform=react-native&utm_source=expo&utm_medium=referral&utm_term=expo-react-native
// SecureStore : import * as SecureStore from 'expo-secure-store';

// https://github.com/ousszizou/user-management-app-yt/blob/main/lib/contexts/auth/authContext.tsx
// https://github.com/ousszizou/user-management-app-yt/tree/main

// const supabaseUrl = 'https://xyzcompany.supabase.co'
// const supabaseAnonKey = 'public-anon-key'

//dbpass: test123!
// Project URL: https://owkjglyhdlvptvwewtzu.supabase.co
// API Key anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93a2pnbHloZGx2cHR2d2V3dHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODkxNDMsImV4cCI6MjA0OTk2NTE0M30.4Na1Ro8LSpyQ3UsQDVXEZ6Iku9zCaRSMkK2Q89tcU_o
/**
 * 
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://owkjglyhdlvptvwewtzu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_REACT_NATIVE_SUPABASE_URL || 'https://owkjglyhdlvptvwewtzu.supabase.co'
const supabaseKey =
  process.env.EXPO_REACT_NATIVE_SUPABASE_SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93a2pnbHloZGx2cHR2d2V3dHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODkxNDMsImV4cCI6MjA0OTk2NTE0M30.4Na1Ro8LSpyQ3UsQDVXEZ6Iku9zCaRSMkK2Q89tcU_o'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
