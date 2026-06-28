// Free geocoding endpoint from the same Open-Meteo project, used to turn a
// city name typed by the user into coordinates we can fetch weather for.

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchCities(query) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const params = new URLSearchParams({
    name: trimmed,
    count: '10',
    language: 'en',
    format: 'json',
  });

  let response;
  try {
    response = await fetch(`${GEOCODING_URL}?${params.toString()}`);
  } catch (err) {
    throw new Error('Network request failed while searching for cities.');
  }

  if (!response.ok) {
    throw new Error(`Geocoding service returned an error (status ${response.status}).`);
  }

  const data = await response.json();
  if (!data.results) return [];

  return data.results.map((r) => ({
    id: `${r.id}`,
    name: r.name,
    admin1: r.admin1 || '',
    country: r.country || '',
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}
