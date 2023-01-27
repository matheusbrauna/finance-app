import { FormEvent, useState } from 'react'
import { useDeleteCategory } from '../../../hooks/useDeleteCategory'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function EditCategory() {
  const [title, setTitle] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: deleteMutateAsync } = useDeleteCategory()
  const {
    editCategory: { category, isVisible },
    toggleEditCategory,
  } = useUiSlice()

  async function handleEditCategory(e: FormEvent) {
    e.preventDefault()
    if (!title || !percentage) return
    await updateMutateAsync({
      id: category?.id!,
      percentage,
      title,
    })
    setTitle('')
    setPercentage(0)
    toggleEditCategory(null)
  }

  async function handleRemoveCategory() {
    await deleteMutateAsync(category?.id!)
    setTitle('')
    setPercentage(0)
    toggleEditCategory(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleEditCategory(null)}
      title="Editar"
    >
      <div>
        <form onSubmit={handleEditCategory}>
          <div className={styles['label-input']}>
            <label htmlFor="title" className="p">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles['label-input']}>
            <label htmlFor="percentage" className="p">
              Porcentagem Alocada
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              placeholder="%"
              className="max-width"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleRemoveCategory}
            >
              Excluir
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
