import { useState, useEffect } from 'react';

const useQuorumPersistence = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // 1. Initialize state with localStorage data or initialValue
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(`QUORUM_V1_${key}`);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("CRITICAL_ERROR: Persistence Link Severed", error);
      return initialValue;
    }
  });

  // 2. Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(`QUORUM_V1_${key}`, JSON.stringify(state));
    } catch (error) {
      console.warn("QUORUM_WARNING: Storage limit approaching", error);
    }
  }, [key, state]);

  return [state, setState];
};

export default useQuorumPersistence;
