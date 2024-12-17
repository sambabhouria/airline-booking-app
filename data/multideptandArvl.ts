/**
 * Example with multi-city departure and arrival airports
 * https://serpapi.com/search.json?engine=google_flights&multi_city_json=[{"departure_id":"CDG","arrival_id":"NRT","date":"2024-12-13"},{"departure_id":"NRT","arrival_id":"LAX,SEA","date":"2024-12-19"},{"departure_id":"LAX,SEA","arrival_id":"AUS","date":"2024-12-27","times":"8,18,9,23"}]&type=3&currency=USD&hl=en
 * 
 * require 'google_search_results' 

params = {
  engine: "google_flights",
  multi_city_json: "[{"departure_id":"CDG","arrival_id":"NRT","date":"2024-12-13"},{"departure_id":"NRT","arrival_id":"LAX,SEA","date":"2024-12-19"},{"departure_id":"LAX,SEA","arrival_id":"AUS","date":"2024-12-27","times":"8,18,9,23"}]",
  type: "3",
  currency: "USD",
  hl: "en",
  api_key: "c803b560f44b843995dfd9ca68df14e7cc50ea820ab586f5189a83baf28ddabc"
}

search = GoogleSearch.new(params)
hash_results = search.get_hash

JSON structure overview
{
  ...
  "airports": [
    {
      "departure": [
        {
          "airport": {
            "name": "String - Departure airport name",
            "id": "String - Departure airport code"
          },
          "city": "String - Departure city",
          "country": "String - Departure country name",
          "country_code": "String - Departure country code",
          "image": "String - URL to the image of the departure city",
          "thumbnail": "String - URL to the thumbnail image of the departure city"
        },
      ],
      "arrival": [
        {
          "airport": {
            "name": "String - Arrival airport name",
            "id": "String - Arrival airport code"
          },
          "city": "String - Arrival city",
          "country": "String - Arrival country name",
          "country_code": "String - Arrival country code",
          "image": "String - URL to the image of the arrival city",
          "thumbnail": "String - URL to the thumbnail image of the arrival city"
        },
      ]
    },
  ],
  ...
}
 */

export const multiDepartureAndArrival = {
  airports: [
    {
      departure: [
        {
          airport: {
            id: 'CDG',
            name: 'Paris Charles de Gaulle Airport',
          },
          city: 'Paris',
          country: 'France',
          country_code: 'FR',
          image:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGx8ii2KbSDdbdzfKye5oDN2bwBA6audqI7XUEf2iMRZezpn_ZbQe1ZIuvUSH-8XOMe958umDwSsAF1w',
          thumbnail:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSyQJ-woNs0iO22mPSkmRUM5gcsTbbYeypQ6BBTeFxXr90mqTxZl57Fdq2CDuLn4w7cKZ8TT9_zZhOpF57rIpA7yWKQnqKvkKIf9Y-qJDo',
        },
      ],
      arrival: [
        {
          airport: {
            id: 'NRT',
            name: 'Narita International Airport',
          },
          city: 'Tokyo',
          country: 'Japan',
          country_code: 'JP',
          image:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTqHkzEeI2bSglPzmSGZL7bxXmn0wJgOn2ZtEN8I47uBnzY1CnHzGtD-YseJXqyexcAcw_uJp-D5HTkCg',
          thumbnail:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLnIToEgwiM_jV3cbw5eQZoUAIg6XqdrJAiClDyyg0w-JBSRN5ZeOT-iFb3SvwkwP1uoBCmT-gKE5VcyCYf-xq4guL4NAFICSaNyOnYOA',
        },
      ],
    },
    {
      departure: [
        {
          airport: {
            id: 'NRT',
            name: 'Narita International Airport',
          },
          city: 'Tokyo',
          country: 'Japan',
          country_code: 'JP',
          image:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTqHkzEeI2bSglPzmSGZL7bxXmn0wJgOn2ZtEN8I47uBnzY1CnHzGtD-YseJXqyexcAcw_uJp-D5HTkCg',
          thumbnail:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLnIToEgwiM_jV3cbw5eQZoUAIg6XqdrJAiClDyyg0w-JBSRN5ZeOT-iFb3SvwkwP1uoBCmT-gKE5VcyCYf-xq4guL4NAFICSaNyOnYOA',
        },
      ],
      arrival: [
        {
          airport: {
            id: 'LAX',
            name: 'Los Angeles International Airport',
          },
          city: 'Los Angeles',
          country: 'United States',
          country_code: 'US',
          image:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFuS2Y5_b7ZIl-g2Hm7jnG7zoi2uk0CQltF_DFbp6gIzfYznnOB6uJm9d6ePT5PJO5XM1j8vigwCNxRA',
          thumbnail:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4B0K7etaN3KgEgtU5dJajdcmLtB5QSDRYr4KqcwH1iWxMm7TIqwtcUTTHD5AmNyeeFIpVpTnbSDeuD_HVlkYzOam-TO9w1worRSGRTUo',
        },
        {
          airport: {
            id: 'SEA',
            name: 'Seattle–Tacoma International Airport',
          },
          city: 'Seattle',
          country: 'United States',
          country_code: 'US',
          image:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSAiBpSv2yUgizRXFmwGP3MTh6M7DGi6u5WgjN5zbRJ9jD42_UzeQNdCTyuPiU5fj8jF1Podav6__a_A',
          thumbnail:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSY5I5L6loeputAIHRWtjOdGurjvRa1ioycHdq2XPS_Io8MuYXvN2ZiixmnVQBWQ_fjPP1A9o9y9-o-yeukkA0ZTCtpBvF4MXtRITUgCs8',
        },
      ],
    },
    {
      departure: [
        {
          airport: {
            id: 'LAX',
            name: 'Los Angeles International Airport',
          },
          city: 'Los Angeles',
          country: 'United States',
          country_code: 'US',
          image:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFuS2Y5_b7ZIl-g2Hm7jnG7zoi2uk0CQltF_DFbp6gIzfYznnOB6uJm9d6ePT5PJO5XM1j8vigwCNxRA',
          thumbnail:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4B0K7etaN3KgEgtU5dJajdcmLtB5QSDRYr4KqcwH1iWxMm7TIqwtcUTTHD5AmNyeeFIpVpTnbSDeuD_HVlkYzOam-TO9w1worRSGRTUo',
        },
        {
          airport: {
            id: 'SEA',
            name: 'Seattle–Tacoma International Airport',
          },
          city: 'Seattle',
          country: 'United States',
          country_code: 'US',
          image:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSSAiBpSv2yUgizRXFmwGP3MTh6M7DGi6u5WgjN5zbRJ9jD42_UzeQNdCTyuPiU5fj8jF1Podav6__a_A',
          thumbnail:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSY5I5L6loeputAIHRWtjOdGurjvRa1ioycHdq2XPS_Io8MuYXvN2ZiixmnVQBWQ_fjPP1A9o9y9-o-yeukkA0ZTCtpBvF4MXtRITUgCs8',
        },
      ],
      arrival: [
        {
          airport: {
            id: 'AUS',
            name: 'Austin-Bergstrom International Airport',
          },
          city: 'Austin',
          country: 'United States',
          country_code: 'US',
          image:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKdjkMcBZuGRD1MjnuLQvdGtpTk0RyjdYs0Z8JsPtfIjer-6VvmfmMLxzvBkeyUrhf_focikfda4rVHg',
          thumbnail:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSQ73FSj9E8pKaNvjWKyEDQGfLV-pky_onARvOY-zHWvQ-hOuPJSqyyXzvyg4-kGGAcZxdO6T5SYGWBzrX8x6MSPq7gBHsSLzX9MYjFJWA',
        },
      ],
    },
  ],
}
