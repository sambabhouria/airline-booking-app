import React from 'react'
import { Text, View } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'

const DatePickerField = ({ label, value, onChange, error }: any) => {
  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      const fixedDate = new Date(selectedDate)
      fixedDate.setHours(12, 0, 0, 0)
      onChange(fixedDate)
    }
  }
  return (
    <View className="justify-center items-start pb-4">
      <Text className="text-lg font-bold text-gray-700">{label}</Text>

      <DateTimePicker value={value} mode="date" onChange={handleDateChange} display="default" themeVariant="light" />
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

export default DatePickerField
