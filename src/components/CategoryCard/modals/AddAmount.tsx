import { FormEvent, useState } from 'react'
import { useCreateTransaction } from '../../../hooks/useCreateTransaction'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function AddAmount() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const {
    addAmount: { category, isVisible },
    toggleAddAmount,
  } = useUiSlice()
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()

  function handleAddAmount(e: FormEvent) {
    e.preventDefault()
    if (!title || !amount) return
    updateMutateAsync({
      id: category?.id!,
      amount: category?.amount! + amount,
    })
    createMutateAsync({
      amount,
      title,
      type: 'income',
    })
    setTitle('')
    setAmount(0)
    toggleAddAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddAmount(null)}
      title="Adicionar"
    >
      <div>
        <form onSubmit={handleAddAmount}>
          <div className={styles['label-input']}>
            <label htmlFor="title" className="p">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ex: venda do teclado"
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
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
