import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../services/firebase'

interface HandleDeleteDocsProps {
  id: string
  collectionName: string
}

export function useDeleteDocs() {
  const handleDeleteDocs = async ({
    id,
    collectionName,
  }: HandleDeleteDocsProps) => {
    const categoryDoc = doc(db, collectionName, id)
    await deleteDoc(categoryDoc)
  }

  return {
    handleDeleteDocs,
  }
}
