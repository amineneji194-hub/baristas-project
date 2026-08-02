/** Skeleton placeholders shown during the brief initial load. */
export default function MenuSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-3 px-4 pt-6" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3 rounded-2xl bg-surface p-3 ring-1 ring-line">
          <div className="skeleton h-24 w-24 rounded-xl" />
          <div className="flex flex-1 flex-col gap-2 py-1">
            <div className="skeleton h-5 w-2/3 rounded" />
            <div className="skeleton h-3 w-full rounded" />
            <div className="skeleton h-3 w-4/5 rounded" />
            <div className="mt-auto skeleton h-4 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
