import { useEffect, useState } from 'react'
import {
  collection as getCollection,
  DocumentData,
  onSnapshot,
} from '@firebase/firestore'
import { db } from '../services/firebase'

export function useGetDocs(collectionName: string) {
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const collection = getCollection(db, collectionName)
  useEffect(() => {
    const getDocs = onSnapshot(collection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setDocuments(data)
    })

    return () => {
      getDocs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return documents
}
