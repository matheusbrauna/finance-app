import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateDocs } from '../../../hooks/useUpdateDocs'
import { RootState } from '../../../store'
import { toggleAddSalary } from '../../../store/slices/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function AddSalary() {
  const [amount, setAmount] = useState(0)
  const { isVisible } = useSelector((state: RootState) => state.ui.addSalary)
  const { categories } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const { handleUpdateDoc } = useUpdateDocs()

  function handleAddSalary(e: FormEvent) {
    e.preventDefault()
    if (!amount) return
    categories?.forEach((category) => {
      const totalAmount = (amount * category.percentage) / 100
      handleUpdateDoc({
        id: category?.id!,
        collectionName: 'categories',
        updatedFields: {
          amount: category?.amount + totalAmount,
        },
      })
    })
    setAmount(0)
    dispatch(toggleAddSalary(null))
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => dispatch(toggleAddSalary(null))}
      title="Adicionar salário"
    >
      <div>
        <form onSubmit={handleAddSalary}>
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
