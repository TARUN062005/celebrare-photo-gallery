function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-5 w-5 ${filled ? "fill-rose-600" : "fill-none stroke-slate-700"}`}
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

function photoSrc(downloadUrl) {
  if (typeof downloadUrl !== "string" || downloadUrl.length === 0) {
    return "";
  }

  return downloadUrl.replace(/\/\d+\/\d+$/, "/600/450");
}

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const label = isFavorite
    ? `Remove ${photo.author} from favourites`
    : `Add ${photo.author} to favourites`;

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-slate-100">
        <img
          src={photoSrc(photo.download_url)}
          alt={`Photo by ${photo.author}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-3">
        <h2 className="min-w-0 flex-1 break-words text-sm font-medium text-slate-900">
          {photo.author}
        </h2>
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-pressed={isFavorite}
          aria-label={label}
          className="shrink-0 rounded-full p-1.5 hover:bg-slate-100"
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    </article>
  );
}
