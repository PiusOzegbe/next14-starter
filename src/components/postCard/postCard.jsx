import styles from "./postCard.module.css"
import Link from "next/link"
import Image from "next/image"

const PostCard = ({title, body, post}) => {
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            
               {
                post.img &&
               <div className={styles.imgContainer}>
               <Image src={post.img} fill alt="" className={styles.img} /> 
                </div>

                }

            <span className={styles.date}>01.01.2024</span>
        </div>
        <div className={styles.botton}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.desc}>{body}</p>
            <Link className={styles.link} href={`/blog/${post.slug}`}>Read More</Link>
        </div>
    </div>
  )
}

export default PostCard
