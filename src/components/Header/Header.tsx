import Image from 'next/image'
import { useMenu } from '../../hooks/useMenu'
import styles from './Header.module.scss'
import { HeaderMenu } from './HeaderMenu'
import { AddSalary } from './modals/AddSalary'
import { useSession } from 'next-auth/react'

export function Header() {
  const { handleToggleMenu, isMenuVisible } = useMenu()
  const { data } = useSession()

  return (
    <>
      <AddSalary />
      <section className={styles.header}>
        <div className={styles.message}>
          <h1>Olá {data?.user?.name}, senti saudades 😄!</h1>
          <h2>Sua carteira está esperando por você</h2>
        </div>
        <div className={styles.avatar}>
          <Image
            src={data?.user?.image ?? ''}
            alt="avatar"
            fill
            onClick={handleToggleMenu}
          />
          {isMenuVisible && (
            <HeaderMenu onHandleToggleMenu={handleToggleMenu} />
          )}
        </div>
      </section>
    </>
  )
}
