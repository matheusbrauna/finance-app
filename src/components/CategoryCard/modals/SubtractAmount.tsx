import { FormEvent, useState } from 'react'
import { useCreateTransaction } from '../../../hooks/useCreateTransaction'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function SubtractAmount() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const {
    subtractAmount: { category, isVisible },
    toggleSubtractAmount,
  } = useUiSlice()
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()

  function handleSubtractAmount(e: FormEvent) {
    e.preventDefault()
    if (!title || !amount) return
    updateMutateAsync({
      id: category?.id!,
      amount: category?.amount! - amount,
    })
    createMutateAsync({
      amount,
      title,
      type: 'outcome',
    })
    setTitle('')
    setAmount(0)
    toggleSubtractAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleSubtractAmount(null)}
      title="Descontar"
    >
      <div>
        <form onSubmit={handleSubtractAmount}>
          <div className={styles['label-input']}>
            <label htmlFor="title" className="p">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ex: gasolina do carro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles['label-input']}>
            <label htmlFor="amount" className="p">
              Valor
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="R$"
              className="max-width"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit" className="btn btn-primary">
              Descontar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
