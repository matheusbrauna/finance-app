import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteDocs } from '../../../hooks/useDeleleDocs'
import { useUpdateDocs } from '../../../hooks/useUpdateDocs'
import { RootState } from '../../../store'
import { toggleEditCategory } from '../../../store/slices/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function EditCategory() {
  const [title, setTitle] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { isVisible, category } = useSelector(
    (state: RootState) => state.ui.editCategory,
  )
  const dispatch = useDispatch()
  const { handleUpdateDoc } = useUpdateDocs()
  const { handleDeleteDocs } = useDeleteDocs()

  function handleEditCategory(e: FormEvent) {
    e.preventDefault()
    if (!title || !percentage) return
    handleUpdateDoc({
      id: category?.id!,
      collectionName: 'categories',
      updatedFields: {
        title,
        percentage,
      },
    })
    setTitle('')
    setPercentage(0)
    dispatch(toggleEditCategory(null))
  }

  function handleRemoveCategory() {
    handleDeleteDocs({
      id: category?.id!,
      collectionName: 'categories',
    })
    setTitle('')
    setPercentage(0)
    dispatch(toggleEditCategory(null))
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => dispatch(toggleEditCategory(null))}
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
              onChange={(e) => setPercentage(e.target.valueAsNumber)}
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
