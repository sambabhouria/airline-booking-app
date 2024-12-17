/**
 * https://serpapi.com/search.json?engine=google_flights&departure_id=PEK&arrival_id=AUS&outbound_date=2024-12-13&return_date=2024-12-19&currency=USD&hl=en
 *
 * https://github.com/serpapi/google-search-results-ruby
 *
 * https://github.com/serpapi
 * https://serpapi.com/google-flights-airports
 * // https://github.com/serpapi/google-search-results-golang
 *
 * https://github.com/serpapi/serpapi-dotnet
 *
 * https://serpapi.com/search.json?engine=google_flights&departure_id=PEK&arrival_id=AUS&outbound_date=2024-12-13&return_date=2024-12-19&currency=USD&hl=en
 */

export const OneWay = {
  flights: [
    {
      departure_airport: {
        name: 'Beijing Capital International Airport',
        id: 'PEK',
        time: '2023-10-03 15:10',
      },
      arrival_airport: {
        name: 'Haneda Airport',
        id: 'HND',
        time: '2023-10-03 19:35',
      },
      duration: '3 hours 15 minutes',
      airplane: 'Boeing 787',
      airline: 'ANA',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/NH.png',
      travel_class: 'Economy',
      flight_number: 'NH 962',
      legroom: '31 in',
      extensions: [
        'Average legroom (31 in)',
        'Wi-Fi for a fee',
        'In-seat power & USB outlets',
        'On-demand video',
        'Carbon emissions estimate: 133 kg',
      ],
    },
    {
      departure_airport: {
        name: 'Haneda Airport',
        id: 'HND',
        time: '2023-10-03 21:05',
      },
      arrival_airport: {
        name: 'Los Angeles International Airport',
        id: 'LAX',
        time: '2023-10-03 15:10',
      },
      duration: '5 hours 15 minutes',
      airplane: 'Boeing 787',
      airline: 'ANA',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/NH.png',
      travel_class: 'Economy',
      flight_number: 'NH 126',
      ticket_also_sold_by: ['United'],
      legroom: '32 in',
      extensions: [
        'Above average legroom (32 in)',
        'In-seat power & USB outlets',
        'On-demand video',
        'Carbon emissions estimate: 836 kg',
      ],
      overnight: true,
    },
    {
      departure_airport: {
        name: 'Los Angeles International Airport',
        id: 'LAX',
        time: '2023-10-03 19:01',
      },
      arrival_airport: {
        name: 'Austin-Bergstrom International Airport',
        id: 'AUS',
        time: '2023-10-03 23:59',
      },
      duration: '1hour 15 minutes',
      airplane: 'Boeing 737MAX 9 Passenger',
      airline: 'United',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/UA.png',
      travel_class: 'Economy',
      flight_number: 'UA 2175',
      legroom: '30 in',
      price: 2512,
      extensions: [
        'Average legroom (30 in)',
        'Wi-Fi for a fee',
        'In-seat power outlet',
        'Stream media to your device',
        'Carbon emissions estimate: 135 kg',
      ],
    },
    {
      departure_airport: {
        name: 'Beijing Capital International Airport',
        id: 'PEK',
        time: '2023-10-03 10:40',
      },
      arrival_airport: {
        name: 'Incheon International Airport',
        id: 'ICN',
        time: '2023-10-03 13:50',
      },
      duration: '1hours 1 minute',
      airplane: 'Airbus A330',
      airline: 'Asiana',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/OZ.png',
      travel_class: 'Economy',
      flight_number: 'OZ 332',
      legroom: '32 in',
      extensions: [
        'Above average legroom (32 in)',
        'In-seat power outlet',
        'On-demand video',
        'Carbon emissions estimate: 84 kg',
      ],
    },
    {
      departure_airport: {
        name: 'Incheon International Airport',
        id: 'ICN',
        time: '2023-10-03 20:55',
      },
      arrival_airport: {
        name: 'San Francisco International Airport',
        id: 'SFO',
        time: '2023-10-03 15:30',
      },
      duration: '3hours 15 minutes',
      airplane: 'Airbus A350',
      airline: 'Asiana',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/OZ.png',
      travel_class: 'Economy',
      flight_number: 'OZ 212',
      legroom: '32 in',
      price: 908,
      extensions: [
        'Above average legroom (32 in)',
        'Wi-Fi for a fee',
        'In-seat power & USB outlets',
        'On-demand video',
        'Carbon emissions estimate: 619 kg',
      ],
      overnight: true,
      often_delayed_by_over_30_min: true,
    },
    {
      departure_airport: {
        name: 'San Francisco International Airport',
        id: 'SFO',
        time: '2023-10-04 07:40',
      },
      arrival_airport: {
        name: 'Austin-Bergstrom International Airport',
        id: 'AUS',
        time: '2023-10-04 13:10',
      },
      duration: '2hours 15 minutes',
      airplane: 'Boeing 737',
      airline: 'Alaska',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/AS.png',
      travel_class: 'Economy',
      flight_number: 'AS 512',
      legroom: '31 in',
      price: 252,
      extensions: [
        'Average legroom (31 in)',
        'Wi-Fi for a fee',
        'In-seat power & USB outlets',
        'Stream media to your device',
        'Carbon emissions estimate: 175 kg',
      ],
    },
    {
      departure_airport: {
        name: 'Beijing Capital International Airport',
        id: 'PEK',
        time: '2023-10-03 18:30',
      },
      arrival_airport: {
        name: 'Incheon International Airport',
        id: 'ICN',
        time: '2023-10-03 21:40',
      },
      duration: '1hour 15 minutes',
      airplane: 'Boeing 737MAX 8 Passenger',
      airline: 'Korean Air',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/KE.png',
      travel_class: 'Economy',
      flight_number: 'KE 860',
      legroom: '31 in',
      price: 2987,
      extensions: [
        'Average legroom (31 in)',
        'Wi-Fi for a fee',
        'In-seat power & USB outlets',
        'Stream media to your device',
        'Carbon emissions estimate: 81 kg',
      ],
    },
    {
      departure_airport: {
        name: 'Incheon International Airport',
        id: 'ICN',
        time: '2023-10-04 09:20',
      },
      arrival_airport: {
        name: 'Dallas/Fort Worth International Airport',
        id: 'DFW',
        time: '2023-10-04 08:00',
      },
      duration: '3hours 15 minutes',
      airplane: 'Boeing 787',
      airline: 'Korean Air',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/KE.png',
      travel_class: 'Economy',
      flight_number: 'KE 31',
      legroom: '33 in',
      price: 5600,
      extensions: [
        'Above average legroom (33 in)',
        'In-seat power & USB outlets',
        'On-demand video',
        'Carbon emissions estimate: 807 kg',
      ],
      overnight: true,
    },
    {
      departure_airport: {
        name: 'Dallas/Fort Worth International Airport',
        id: 'DFW',
        time: '2023-10-04 09:35',
      },
      arrival_airport: {
        name: 'Austin-Bergstrom International Airport',
        id: 'AUS',
        time: '2023-10-04 10:40',
      },
      duration: '1hour 10 minutes',
      airplane: 'Embraer 175',
      airline: 'American',
      airline_logo: 'https://www.gstatic.com/flights/airline_logos/70px/AA.png',
      travel_class: 'Economy',
      flight_number: 'AA 3489',
      legroom: '30 in',
      price: 3000,
      extensions: [
        'Average legroom (30 in)',
        'Wi-Fi for a fee',
        'In-seat power & USB outlets',
        'Stream media to your device',
        'Carbon emissions estimate: 60 kg',
      ],
    },
  ],
}
