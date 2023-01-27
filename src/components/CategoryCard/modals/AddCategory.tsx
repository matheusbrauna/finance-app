import { FormEvent, useState } from 'react'
import { useCreateCategory } from '../../../hooks/useCreateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function AddCategory() {
  const [title, setTitle] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { mutateAsync } = useCreateCategory()
  const {
    toggleAddCategory,
    addCategory: { isVisible },
  } = useUiSlice()

  async function handleAddCategory(e: FormEvent) {
    e.preventDefault()
    if (!title || !percentage) return
    await mutateAsync({
      title,
      percentage,
    })
    setPercentage(0)
    setTitle('')
    toggleAddCategory(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddCategory(null)}
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
              onChange={(e) => setPercentage(Number(e.target.value))}
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
