import { serverTimestamp } from '@firebase/firestore'
import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddDocs } from '../../../hooks/useAddDocs'
import { useUpdateDocs } from '../../../hooks/useUpdateDocs'
import { RootState } from '../../../store'
import { toggleAddAmount } from '../../../store/slices/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function AddAmount() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const { isVisible, category } = useSelector(
    (state: RootState) => state.ui.addAmount,
  )
  const dispatch = useDispatch()
  const { handleUpdateDoc } = useUpdateDocs()
  const { handleAddDocs } = useAddDocs()

  function handleAddAmount(e: FormEvent) {
    e.preventDefault()
    if (!title || !amount) return
    handleUpdateDoc({
      id: category?.id!,
      collectionName: 'categories',
      updatedFields: {
        amount: category?.amount! + amount,
      },
    })
    handleAddDocs({
      collectionName: 'transactions',
      fields: {
        amount,
        title,
        type: 'income',
        date: serverTimestamp(),
      },
    })
    setTitle('')
    setAmount(0)
    dispatch(toggleAddAmount(null))
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => dispatch(toggleAddAmount(null))}
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
              onChange={(e) => setAmount(e.target.valueAsNumber)}
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
