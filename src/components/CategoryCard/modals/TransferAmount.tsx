import { FormEvent, useEffect, useState } from 'react'
import { useGetCategories } from '../../../hooks/useGetCategories'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function TransferAmount() {
  const [destination, setDestination] = useState('')
  const [options, setOptions] = useState([''])
  const [amount, setAmount] = useState(0)
  const {
    transferAmount: { isVisible, category },
    toggleTransferAmount,
  } = useUiSlice()
  const categories = useGetCategories()
  const { mutateAsync } = useUpdateCategory()

  useEffect(() => {
    const options = categories
      ?.map((category) => category.title)
      .filter((title) => title !== category?.title)

    if (!options) return
    setOptions(options)
    setDestination(options[0])
  }, [categories, category?.title])

  function handleTransferAmount(e: FormEvent) {
    e.preventDefault()
    if (!amount) return
    const destinationCategory = categories?.find(
      (category) => category.title === destination,
    )
    mutateAsync({
      id: category?.id!,
      amount: category?.amount ?? 0 - amount,
    })
    mutateAsync({
      id: destinationCategory?.id!,
      amount: category?.amount ?? 0 + amount,
    })
    setAmount(0)
    toggleTransferAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleTransferAmount(null)}
      title="Transferir"
    >
      <div>
        <form onSubmit={handleTransferAmount}>
          <div className={styles['label-input']}>
            <p>De</p>
            <p className="caption">{category?.title ?? 'Não encontrado'}</p>
          </div>
          <div className={styles['label-input']}>
            <label htmlFor="destination">Para</label>
            <select
              name="destination"
              id="destination"
              className="max-width"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles['label-input']}>
            <label className="p">Valor</label>
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
              Transferir
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
