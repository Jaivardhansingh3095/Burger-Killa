import { useEffect, useState } from 'react';
import { getSearchLocation } from '../../services/apiMap';

export function useSearchLocation(delay = 1500) {
  const [keyword, setKeyword] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      const handler = setTimeout(() => {
        if (keyword.trim() === '') {
          setSuggestion([]);
          return;
        }

        const fetchSuggestions = async () => {
          setLoading(true);
          try {
            const data = await getSearchLocation(keyword);
            console.log(data);

            setError(() => {
              return data.status === 'FAILURE';
            });

            if (data.error_message) {
              throw new Error(data.error_message);
            }

            setSuggestion(data.predictions);
          } catch (err) {
            console.log('Error with getting suggestion, ', err.message);
            setSuggestion([]);
          } finally {
            setLoading(false);
          }
        };

        fetchSuggestions();
      }, delay);

      return () => clearTimeout(handler);
    },
    [keyword, delay],
  );

  return { setKeyword, keyword, suggestion, loading, error };
}
