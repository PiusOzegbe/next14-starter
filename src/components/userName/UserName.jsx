import { getUser } from "@/lib/data"
import styles from "./userName.module.css"

const UserName = async ({slug}) => {

    const name = await getUser(slug)

  return (
    <div className={styles.detailText}>
        <span className={styles.detailTitle}>Author</span>
        <span className={styles.detailValue}>{name.username}</span>
    </div>
  )
}

export default UserName