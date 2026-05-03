import { useEffect, useState } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from './firebase';

const BASE_RESONANCE_COUNT = 135;

export function useResonanceCount() {
  const [memberCount, setMemberCount] = useState(BASE_RESONANCE_COUNT);

  useEffect(() => {
    let mounted = true;

    const syncCount = async () => {
      try {
        const snapshot = await getCountFromServer(collection(db, 'waitlist'));
        if (mounted) {
          setMemberCount(BASE_RESONANCE_COUNT + snapshot.data().count);
        }
      } catch (error) {
        console.warn('Unable to sync resonance count:', error);
      }
    };

    const handleJoin = () => {
      setMemberCount((count) => count + 1);
    };

    syncCount();
    window.addEventListener('WAITLIST_JOINED', handleJoin);

    return () => {
      mounted = false;
      window.removeEventListener('WAITLIST_JOINED', handleJoin);
    };
  }, []);

  return memberCount;
}

export function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}
