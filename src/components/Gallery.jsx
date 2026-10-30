import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  FAVORITES_STORAGE_KEY,
  TOGGLE_FAVORITE,
  favoritesReducer,
  loadFavorites,
} from "../favoritesReducer";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [query, setQuery] = useState("");
  const [favorites, dispatch] = useReducer(favoritesReducer, [], loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Favourites still work for this visit if storage is unavailable.
    }
  }, [favorites]);

  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  const handleToggleFavorite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVORITE, id });
  }, []);

  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return photos;
    }

    return photos.filter((photo) =>
      String(photo.author ?? "")
        .toLowerCase()
        .includes(term),
    );
  }, [photos, query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-semibold tracking-tight">Photo Gallery</h1>
          <label htmlFor="author-search" className="mt-4 block text-sm font-medium text-slate-700">
            Search by author
          </label>
          <input
            id="author-search"
            type="search"
            value={query}
            onChange={handleSearchChange}
            placeholder="Type an author name"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 outline-none focus:border-slate-500"
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {loading && (
          <div className="flex flex-col items-center gap-3 py-20" role="status">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
            <p className="text-sm text-slate-600">Loading photos…</p>
          </div>
        )}

        {!loading && error && (
          <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && photos.length > 0 && filteredPhotos.length === 0 && (
          <p className="py-16 text-center text-sm text-slate-600">No photos match your search.</p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <li key={photo.id}>
                <PhotoCard
                  photo={photo}
                  isFavorite={favorites.includes(String(photo.id))}
                  onToggleFavorite={handleToggleFavorite}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
