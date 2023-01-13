import { addDoc, collection } from '@firebase/firestore'
import { db } from '../services/firebase'
import { Category } from '../store/@types/Category'

interface HandleAddDocsProps {
  collectionName: string
  fields: Omit<Category, 'id'>
}

export function useAddDocs() {
  const handleAddDocs = async ({
    collectionName,
    fields,
  }: HandleAddDocsProps) => {
    const categoryDoc = collection(db, collectionName)
    await addDoc(categoryDoc, fields)
  }

  return {
    handleAddDocs,
  }
}
