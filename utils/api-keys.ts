import axios from 'axios'
// https://serpapi.com/google-flights-airports
// https://www.freetestapi.com/apis
// https://www.freetestapi.com/apis/airports

// flight api : https://serpapi.com/google-flights-airports

// Base Endpoint
// https://freetestapi.com/api/v1/airports

// Single Record
// https://freetestapi.com/api/v1/airports/1

// Limit Results

// https://freetestapi.com/api/v1/airports?limit=5
// Search Records
// https://freetestapi.com/api/v1/airports?search=[query]

// Sort Records
// https://freetestapi.com/api/v1/airports?sort=name&order=desc

// https://www.freetestapi.com/apis
// https://serpapi.com/google-flights-api
// https://serpapi.com/google-flights-airports

// https://serpapi.com/google-flights-results

export const apiToken = ''
export const baseUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers'

export const clientId = 'n1UxnK3xABSYMKAOeZlgTgAaUObFfCoh'
export const clientSecret = 'BacXpxrdD5BnHh0Z'

let newApiToken = ''

export const getNewAccessToken = async () => {
  console.log('IN THE GET API TOCKEN')
  try {
    const response = await axios.post(
      'tokenUrl',
      {
        client_id: clientSecret,
        client_secret: clientSecret,
        grant_type: 'clients_credentials',
      },
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    newApiToken = await response.data.access_token
    console.log('🚀 ~ getNewAccessToken ~ newApiToken:', newApiToken)
  } catch (error) {
    console.log('🚀 ~ getNewAccessToken ~ error:', error)
  }
}
