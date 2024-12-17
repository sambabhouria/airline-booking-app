import DatePickerField from '@/components/DatePickerField'
import PickerField from '@/components/PickerField'
import TextInputField from '@/components/TextInputField'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Switch, Text, View } from 'react-native'

import countriesData from '@/data/countries.json'

import * as Yup from 'yup'
//3h48
const Travelerdetails = () => {
  const [isPending, setIsPending] = useState(false)
  const [selectGender, setSelectGender] = useState('MALE')
  const [selectedCountry, setSelectedCountry] = useState('FRA')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedNationality, setSelectedNationality] = useState('FRA')
  const [selectPurpose, setSelectPurpose] = useState('Standard')
  const [selectedBirthPlace, setSelectedBirthPlace] = useState('')
  const params = useLocalSearchParams<any>()

  const { flightOfferPrice } = params
  const parsedFlightOfferPrice = flightOfferPrice && JSON.parse(flightOfferPrice)
  const flightsData = parsedFlightOfferPrice?.flights

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const validationSchema = () =>
    Yup.object().shape({
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      gender: Yup.string().required('Gender is required'),
      name: Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name date is required'),
      }),
      documents: Yup.array().of(
        Yup.object().shape({
          number: Yup.string().required('Document Number is required'),
          issuanceDate: Yup.string().required('Inssurance Date is required'),
          expiryDate: Yup.string().required('Expiry Date is required'),
          issuanceCountry: Yup.string().required('Inssuance Country is required'),
          issuanceLocation: Yup.string().required('Inssuance Location is required'),
          nationality: Yup.string().required('Nationality is required'),
          birthPlace: Yup.string().required('Birth Place is required'),
          documentType: Yup.string().required('Document Type is required'),
          holder: Yup.boolean().required('Holder is required'),
        })
      ),
      contact: Yup.object().shape({
        purpose: Yup.string().required('Purpose is required'),
        phones: Yup.array().of(
          Yup.object().shape({
            countryCallingCode: Yup.string().required('Country Calling Code is required'),
            number: Yup.string().required('Number is required'),
          })
        ),
        emailAddress: Yup.string().email('Invalid Email').required('Email Adress is required'),
      }),
    })
  const formatDate = (date: string) => {
    return date?.toString().split('T')[0]
  }
  const handleGenderChange = (value: string) => setSelectGender(value)

  return (
    <View className="flex-1 items-center bg-[#F5F7FA]">
      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-[#000000] bg-opacity-50 w-full h-full justify-center items-center opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}

      <View className="w-full h-full">
        <View
          className=" justify-start border-orange-600 w-full bg-[#192031] relative pt-16 pb-8"
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          {/* Header */}
          <View>
            <View className="flex-row gap-4 justify-start items-center px-2">
              <Pressable className="flex-row gap-2 items-center justify-start h-14 w-[20%]" onPress={() => router.back()}>
                <View className="rounded-full bg-gray-500 h-10 w-10 justify-center items-center">
                  <MaterialIcons size={24} name="keyboard-arrow-left" color={'white'} />
                </View>
              </Pressable>
              <View className="w-[60%] justify-center items-center flex-row">
                <Text className="text-lg text-white font-extrabold">Flight Booking Screen</Text>
              </View>
              <View>
                {/* <View> */}
                <MaterialCommunityIcons name="dots-horizontal" size={30} color={'white'} />
                {/* </View> */}
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignContent: 'center',
            justifyContent: 'center',
            paddingBottom: 200,
          }}
        >
          <Formik
            initialValues={{
              id: '',
              dateOfBirth: new Date(2024, 11, 14),
              gender: selectGender,
              name: {
                firstName: '',
                lastName: '',
              },
              documents: [
                {
                  number: '',
                  issuanceDate: new Date(2024, 11, 14),
                  expiryDate: new Date(2024, 11, 14),
                  issuanceCountry: selectedCountry,
                  issuanceLocation: selectedLocation,
                  nationality: selectedNationality,
                  birthPlace: selectedBirthPlace,
                  documentType: '',
                  holder: true,
                },
              ],
              contact: {
                purpose: selectPurpose,
                phones: [
                  {
                    deviceType: 'MOBILE',
                    countryCallingCode: '',
                    number: '',
                  },
                ],
                emailAddress: '',
              },
            }}
            validationSchema={validationSchema}
            onSubmit={(values: any) => {
              const convertedValues = {
                ...values,
                gender: selectGender,
                dateOfBirth: formatDate(values?.dateOfBirth),
                documents: values.documents.map((doc: any) => ({
                  ...doc,
                  insuanceDate: formatDate(doc?.insuanceDate),
                  expiryDate: formatDate(doc?.expiryDate),
                })),
                id: 1,
              }

              if (flightsData.length) {
                router.push({
                  pathname: '/flightbooking',
                  params: {
                    flighPricingData: JSON.stringify(flightsData),
                    travelerData: JSON.stringify(convertedValues),
                  },
                })
              }
            }}
          >
            {({ handleChange, errors, handleSubmit, values, setFieldValue }) => (
              <View className="w-full px-4 space-y-4 py-4">
                {/* Phone number */}
                <TextInputField
                  label="Phone Number"
                  value={values?.contact?.phones[0]?.number}
                  onChangeText={handleChange('contact.phones[0].number')}
                  placeholder="Enter Phone Number"
                  error={errors?.contact?.phones && errors?.contact?.phones[0]?.number}
                />

                {/* Email Input 3h05 */}

                <TextInputField
                  label="Email Address"
                  value={values?.contact?.emailAddress}
                  onChangeText={handleChange('contact.emailAddress')}
                  placeholder="Enter Email Address"
                  error={errors?.contact && errors?.contact?.emailAddress}
                />
                {/* Date of birth */}
                <DatePickerField
                  label="Date of Birth"
                  value={values?.dateOfBirth}
                  onChange={(date: any) => setFieldValue('dateOfBirth', date)}
                  error={errors?.dateOfBirth && errors.dateOfBirth}
                />
                {/* Gender */}
                <PickerField
                  value={selectGender}
                  label="Gender"
                  // onValueChange={handleGenderChange}
                  onValueChange={(value: string) => {
                    handleGenderChange(value)
                    setFieldValue('gender', value)
                  }}
                  options={[
                    { label: 'MALE', value: 'MALE' },
                    { label: 'FEMALE', value: 'FEMALE' },
                  ]}
                  error={errors?.gender && errors?.gender}
                />

                {/* First Name */}

                <TextInputField
                  label="First Name"
                  value={values.name.firstName}
                  onChangeText={handleChange('name.firstName')}
                  placeholder="First Name"
                  error={errors?.name && errors?.name?.firstName}
                />

                {/* First Name */}

                <TextInputField
                  label="Last Name"
                  value={values?.name?.lastName}
                  onChangeText={handleChange('name.lastName')}
                  placeholder="lastName Name"
                  error={errors?.name && errors?.name?.lastName}
                />
                {/* Documents Section */}
                <View className="w-full pb-4 ">
                  <Text className="text-lg font-bold text-gray-700">Document Section</Text>
                </View>
                {/* Document number */}
                <TextInputField
                  label="Passport Number"
                  value={values?.documents[0]?.number}
                  onChangeText={handleChange('documents[0].number')}
                  placeholder="Enter Passport number"
                  error={errors?.documents && errors?.documents[0]?.number}
                />

                {/* Issuance Date and Expiry Date  3h20*/}
                <View className="flex-row  justify-between items-center">
                  <DatePickerField
                    label="Issuance Date"
                    value={values?.documents[0]?.issuanceDate}
                    onChange={(date: any) => setFieldValue('documents[0].issuanceDate', date)}
                    error={errors?.documents && errors?.documents[0]?.issuanceDate}
                  />

                  <DatePickerField
                    label="Expiry Date"
                    value={values?.documents[0]?.expiryDate}
                    onChange={(date: any) => setFieldValue('documents[0].expiryDate', date)}
                    error={errors?.documents && errors?.documents[0]?.expiryDate}
                  />
                </View>

                {/* Issuance Country */}
                <PickerField
                  value={selectedCountry}
                  label="Issuance Country"
                  onValueChange={(country: string) => {
                    setSelectedCountry(country)
                    setFieldValue('documents[0].issuanceCountry', country)
                  }}
                  options={countriesData.countries.map((country: any) => ({
                    label: country.name,
                    value: country.iso3,
                  }))}
                  error={errors?.documents && errors?.documents[0]?.issuanceCountry}
                />

                {/* Issuance Location*/}
                <PickerField
                  value={selectedLocation}
                  label="Issuance Location"
                  onValueChange={(state: string) => {
                    setSelectedLocation(state)
                    setFieldValue('documents[0].issuanceLocation', state)
                  }}
                  options={
                    countriesData.countries
                      .find((country: any) => country.iso3 === selectedCountry)
                      ?.states.map((state: any) => ({
                        label: state.name,
                        value: state.state_code,
                      })) || []
                  }
                  error={errors?.documents && errors?.documents[0]?.issuanceLocation}
                />

                {/* Nationality */}
                <PickerField
                  value={selectedNationality}
                  label="Nationality"
                  onValueChange={(nationality: string) => {
                    setSelectedNationality(nationality)
                    setFieldValue('documents[0].nationality', nationality)
                  }}
                  options={countriesData.countries.map((country: any) => ({
                    label: country.name,
                    value: country.iso3,
                  }))}
                  error={errors?.documents && errors?.documents[0]?.nationality}
                />

                {/* Birth Place */}

                <PickerField
                  value={selectedBirthPlace}
                  label="Birth Place"
                  onValueChange={(state: string) => {
                    setSelectedBirthPlace(state)
                    setFieldValue('documents[0].birthPlace', state)
                  }}
                  options={
                    countriesData.countries
                      .find((country: any) => country.iso3 === selectedCountry)
                      ?.states.map((state: any) => ({
                        label: state.name,
                        value: state.state_code,
                      })) || []
                  }
                  error={errors?.documents && errors?.documents[0]?.birthPlace}
                />

                {/* Document Type */}
                <PickerField
                  value={values?.documents[0]?.documentType}
                  label="Document Type"
                  onValueChange={handleChange('documents[0].documentType')}
                  options={[
                    { label: 'PASSPORT', value: 'PASSPORT' },
                    { label: 'VISA', value: 'VISA' },
                  ]}
                  error={errors?.documents && errors?.documents[0]?.documentType}
                />

                {/* Contacts Section */}
                <View className="w-full pb-4 ">
                  <Text className="text-lg font-bold text-gray-700">Contacts</Text>
                </View>

                {/* Purpose */}
                <PickerField
                  value={selectPurpose}
                  label="Purpose"
                  onValueChange={(state: string) => {
                    setSelectPurpose(state)
                    setFieldValue('contact.purpose', state)
                  }}
                  options={[
                    { label: 'Standard', value: 'Standard' },
                    { label: 'Diplomat', value: 'Diplomat' },
                  ]}
                  error={errors?.contact && errors?.contact?.purpose}
                />

                {/* Contry Calling Code  */}

                <TextInputField
                  label="Contry Calling Code"
                  value={values?.contact?.phones[0]?.countryCallingCode}
                  onChangeText={handleChange('contact.phones[0].countryCallingCode')}
                  placeholder="Enter Country Calling Code"
                  error={errors?.contact && errors?.contact?.phones[0]?.countryCallingCode}
                />
                <View className="flex-row items-center gap-2">
                  <Text className="text-base font-semibold pr-2">Are you the holder of the passport ? </Text>
                  <Switch value={values?.documents[0]?.holder} onValueChange={() => {}} />

                  {/* <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  /> */}
                </View>
                {/* Submit button */}
                <View className="w-full justify-start pt-8">
                  <Pressable onPress={() => handleSubmit()} className="bg-[#12B3A8] justify-center items-center rounded-lg py-4">
                    <Text className="text-white font-bold text-lg">Submit</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  )
}

export default Travelerdetails
