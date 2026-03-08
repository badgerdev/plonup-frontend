import { UserAnnouncementsListSkeleton } from "@/components/users-public/skeletons/UserAnnouncementsListSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Prawa kolumna (profil + opinie) */}
      <div className="lg:col-span-1 lg:row-start-1 lg:row-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6 h-64">
          <p className="text-gray-500">Ładowanie profilu...</p>
        </div>
      </div>

      {/* Lewa kolumna (ogłoszenia) */}
      <div className="lg:col-span-2 lg:row-start-1 lg:row-span-2">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ogłoszenia użytkownika
          </h2>
          <UserAnnouncementsListSkeleton />
        </div>
      </div>
    </div>
  );
}
