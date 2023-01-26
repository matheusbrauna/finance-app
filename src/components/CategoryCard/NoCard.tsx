import { TbPlus } from 'react-icons/tb'
import { useUiSlice } from '../../stores/ui-slice'
import styles from './NoCard.module.scss'

export function NoCard() {
  const { toggleAddCategory } = useUiSlice()

  return (
    <div className={styles['no-card']} onClick={() => toggleAddCategory(null)}>
      <TbPlus className="icon" />
    </div>
  )
}
