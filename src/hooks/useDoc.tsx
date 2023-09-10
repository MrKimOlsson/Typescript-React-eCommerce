import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

interface DocData {
  id: string;
  [key: string]: any;
}

interface UseDocResult {
  data: DocData | null;
  error: string | null;
  loading: boolean;
}

const useDoc = (collection: string, id: string): UseDocResult => {
  const [data, setData] = useState<DocData | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start loading initially
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDocAsync = async () => {
      try {
        const docRef = doc(db, collection, id);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          setLoading(false);
          setError('Could not find that document');
        } else {
          setData({ id: docSnapshot.id, ...docSnapshot.data() } as DocData);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setError('An error occurred while fetching the document');
      }
    };

    getDocAsync();
  }, [collection, id]);

  return { data, error, loading };
};

export default useDoc;