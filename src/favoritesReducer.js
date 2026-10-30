export const FAVORITES_STORAGE_KEY = "celebrare-favorites";

export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

function isPhotoId(value) {
  return typeof value === "string" || typeof value === "number";
}

export function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return [...new Set(parsed.filter(isPhotoId).map(String))];
  } catch {
    return [];
  }
}

export function favoritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      if (!isPhotoId(action.id)) {
        return state;
      }

      const id = String(action.id);

      return state.includes(id)
        ? state.filter((favoriteId) => favoriteId !== id)
        : [...state, id];
    }

    default:
      return state;
  }
}
