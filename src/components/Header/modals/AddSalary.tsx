import { FormEvent, useState } from 'react'
import { useCreateTransaction } from '../../../hooks/useCreateTransaction'
import { useGetCategories } from '../../../hooks/useGetCategories'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function AddSalary() {
  const [amount, setAmount] = useState(0)
  const {
    addSalary: { isVisible },
    toggleAddSalary,
  } = useUiSlice()
  const categories = useGetCategories()
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()

  function handleAddSalary(e: FormEvent) {
    e.preventDefault()
    if (!amount) return
    categories?.forEach((category) => {
      const totalAmount = (amount * category.percentage) / 100
      updateMutateAsync({
        id: category?.id,
        amount: category?.amount ?? 0 + totalAmount,
      })
      createMutateAsync({
        amount,
        title: `Salário em ${category.title}`,
        type: 'income',
      })
    })
    setAmount(0)
    toggleAddSalary(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddSalary(null)}
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
