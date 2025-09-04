import { OlaMaps } from 'olamaps-web-sdk';

const API_KEY = import.meta.env.VITE_OLAMAP_API_KEY;

export const olaMaps = new OlaMaps({
  apiKey: import.meta.env.VITE_OLAMAP_API_KEY,
});

export async function getSearchLocation(searchKeyword) {
  const res = await fetch(
    `https://api.olamaps.io/places/v1/autocomplete?input=${searchKeyword}&api_key=${API_KEY}`,
    { signal: AbortSignal.timeout(10000) },
  );

  const data = await res.json();

  return data;
}
