/**
 * SerpApi is able to scrape, extract, and make sense of Google Flights Airports.
  We add them to our JSON output as the array airports.
  https://serpapi.com/search.json?engine=google_flights&departure_id=CDG&arrival_id=AUS&outbound_date=2024-12-13&return_date=2024-12-19&currency=USD&hl=en


  // countries https://documenter.getpostman.com/view/1134062/T1LJjU52

require 'google_search_results' 

params = {
  engine: "google_flights",
  departure_id: "CDG",
  arrival_id: "AUS",
  outbound_date: "2024-12-13",
  return_date: "2024-12-19",
  currency: "USD",
  hl: "en",
  api_key: "c803b560f44b843995dfd9ca68df14e7cc50ea820ab586f5189a83baf28ddabc"
}

search = GoogleSearch.new(params)
hash_results = search.get_hash

 */

export const SingleDepartureAndArrival = {
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
    {
      departure: [
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
      arrival: [
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
    },
  ],
}
