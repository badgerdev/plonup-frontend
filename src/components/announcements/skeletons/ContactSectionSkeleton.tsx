export function ContactSectionSkeleton() {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-4">
        <div className="h-10 bg-gray-200 rounded w-24" />
        <div className="h-10 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}
