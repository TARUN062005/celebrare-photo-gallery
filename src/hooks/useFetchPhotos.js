import { useEffect, useState } from "react";

const PHOTOS_URL = "https://picsum.photos/v2/list?limit=30";

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        const response = await fetch(PHOTOS_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Could not load photos (status ${response.status}).`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Could not load photos. The response was not a list.");
        }

        setPhotos(data);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setPhotos([]);
        setError(err.message || "Could not load photos. Check your connection and try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();

    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}
