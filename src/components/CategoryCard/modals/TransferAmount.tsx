import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateDocs } from '../../../hooks/useUpdateDocs'
import { RootState } from '../../../store'
import { toggleTransferAmount } from '../../../store/slices/ui-slice'
import { Modal } from '../../UI/Modal'
import styles from '../../UI/Modal.module.scss'

export function TransferAmount() {
  const [destination, setDestination] = useState('')
  const [options, setOptions] = useState([''])
  const [amount, setAmount] = useState(0)
  const { isVisible, category } = useSelector(
    (state: RootState) => state.ui.transferAmount,
  )
  const dispatch = useDispatch()
  const { categories } = useSelector((state: RootState) => state.app)
  const { handleUpdateDoc } = useUpdateDocs()

  useEffect(() => {
    const options = categories
      ?.map((category) => category.title)
      .filter((title) => title !== category?.title)

    setOptions(options!)
    setDestination(options![0])
  }, [categories, category?.title])

  function handleTransferAmount(e: FormEvent) {
    e.preventDefault()
    if (!amount) return
    const destinationCategory = categories?.find(
      (category) => category.title === destination,
    )
    handleUpdateDoc({
      id: category?.id!,
      collectionName: 'categories',
      updatedFields: {
        amount: category?.amount! - amount,
      },
    })
    handleUpdateDoc({
      id: destinationCategory?.id!,
      collectionName: 'categories',
      updatedFields: {
        amount: category?.amount! + amount,
      },
    })
    setAmount(0)
    dispatch(toggleTransferAmount(null))
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => dispatch(toggleTransferAmount(null))}
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
              onChange={(e) => setAmount(e.target.valueAsNumber)}
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
