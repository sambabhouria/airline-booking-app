import React from 'react'
import { Text, TextInput, View } from 'react-native'

interface TextInputFieldProps {
  label: string
  value: any
  onChangeText: any
  placeholder: string
  error: any
}
const TextInputField = ({ label, value, onChangeText, placeholder, error }: TextInputFieldProps) => {
  return (
    <View className="w-full space-y-1 pb-4">
      <Text className="text-lg font-bold text-gray-700">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
        className="border-2 py-4 rounded-xl border-gray-500 px-2"
      />
      {error && (
        <Text
          className="text-red-500 text-sm"
          style={{
            color: 'red',
          }}
        >
          {error}
        </Text>
      )}
    </View>
  )
}

export default TextInputField
