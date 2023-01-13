import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../services/firebase'
import { Category } from '../store/@types/Category'

interface HandleUpdateDocsProps {
  id: string
  collectionName: string
  updatedFields: Partial<Category>
}

export function useUpdateDocs() {
  const handleUpdateDoc = async ({
    id,
    collectionName,
    updatedFields,
  }: HandleUpdateDocsProps) => {
    const categoryDoc = doc(db, collectionName, id)
    await updateDoc(categoryDoc, updatedFields)
  }

  return {
    handleUpdateDoc,
  }
}
