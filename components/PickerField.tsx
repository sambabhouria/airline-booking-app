import React from 'react'
import { Text, View } from 'react-native'

import RNPickerSelect from 'react-native-picker-select'

const PickerField = ({ label, value, onValueChange, error, options }: any) => {
  return (
    <View className="w-full space-y-1 ">
      <Text className="text-lg font-bold text-gray-700 ">{label}</Text>
      <View className="border-2 py-4 rounded-xl border-gray-500 px-2">
        <RNPickerSelect value={value} onValueChange={onValueChange} items={options} />
        {/* <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'JavaScript', value: 'JavaScript' },
            { label: 'TypeScript', value: 'TypeScript' },
            { label: 'Python', value: 'Python' },
            { label: 'Java', value: 'Java' },
            { label: 'C++', value: 'C++' },
            { label: 'C', value: 'C' },
          ]}
        /> */}
      </View>
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

export default PickerField
