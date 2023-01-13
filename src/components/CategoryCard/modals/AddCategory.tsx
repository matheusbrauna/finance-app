import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddDocs } from '../../../hooks/useAddDocs'
import { RootState } from '../../../store'
import { toggleAddCategory } from '../../../store/slices/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function AddCategory() {
  const [title, setTitle] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { isVisible } = useSelector((state: RootState) => state.ui.addCategory)
  const dispatch = useDispatch()
  const { handleAddDocs } = useAddDocs()

  function handleAddCategory(e: FormEvent) {
    e.preventDefault()
    if (!title || !percentage) return
    handleAddDocs({
      collectionName: 'categories',
      fields: {
        title,
        percentage,
        amount: 0,
      },
    })
    setPercentage(0)
    setTitle('')
    dispatch(toggleAddCategory(null))
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => dispatch(toggleAddCategory(null))}
      title="Nova Categoria"
    >
      <div>
        <form onSubmit={handleAddCategory}>
          <div className={styles['label-input']}>
            <label htmlFor="title" className="p">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Essencial"
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
          </div>
        </form>
      </div>
    </Modal>
  )
}
