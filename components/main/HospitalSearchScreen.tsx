// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import React, { useState, useEffect } from 'react';
import '../../types';
import { Language, Hospital } from '../../types';
import { STRINGS } from '../../constants';
import { fetchHospitals } from '../../services/hospitalService';

interface Props {
  lang: Language;
}

const HospitalSearchScreen: React.FC<Props> = ({ lang }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHospitals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchHospitals();
        setHospitals(data);
      } catch (e) {
        setError('Failed to load hospital data. Please try again later.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadHospitals();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="mt-3 text-[var(--muted-foreground)]">Loading nearby hospitals...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-center py-10 text-[var(--danger)]">{error}</p>;
    }

    if (hospitals.length === 0) {
      return <p className="text-center py-10 text-[var(--muted-foreground)]">No hospitals found nearby.</p>;
    }

    return (
      <div className="space-y-3 mt-4">
        {hospitals.map((hospital, index) => (
          <div key={index} className="bg-[var(--muted)] p-4 rounded-lg border border-[var(--border)]">
            <h3 className="font-bold text-[var(--foreground)]">{hospital.dutyName}</h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{hospital.dutyAddr}</p>
            <div className="flex items-center gap-4 mt-2">
              <a href={`tel:${hospital.dutyTel1}`} className="text-sm text-[var(--primary)] font-medium flex items-center gap-1">
                <iconify-icon icon="lucide:phone" />
                {hospital.dutyTel1}
              </a>
              <span className="text-sm text-[var(--muted-foreground)]">
                {(hospital.distance / 1000).toFixed(1)} km
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="px-6 py-4">
      <div className="relative">
        <input
          type="search"
          placeholder={STRINGS.hospitalSearchPlaceholder[lang]}
          className="w-full pl-10 pr-4 py-2 border border-[var(--input)] bg-[var(--card-background)] text-[var(--foreground)] rounded-lg focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <iconify-icon icon="lucide:search" className="text-[var(--muted-foreground)] text-[0.875rem]" />
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default HospitalSearchScreen;