import UserName from "@/components/userName/UserName"
import styles from "./singlePost.module.css"
import Image from "next/image"
import { Suspense } from "react"
import { getPost } from "@/lib/data"
import next from "next"

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)

  if (!res.ok) {
    throw new Error("something went wrong")
  }

  return res.json()
}

export const generateMetadata = async ({params}) => {
  const { slug } = params

  const data = await getPost(slug)

  return {
    title: data.title,
    description: data.desc
  }
}

const SinglePostPage = async ({params}) => {
  const { slug } = params

  const data = await getData(slug)

  return (
    <div className={styles.container}>
        { data.img &&
        <div className={styles.imgContainer}>
        <Image
        src={data.img}
        alt=""
        fill
        className={styles.img}
         /> 
      </div> }
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.detail}>
          <Image 
          className={styles.avatar}
          src="/noavatar.png"
          alt=""
          width={50}
          height={50}
          />
          <Suspense fallback={<div>Loading...</div>}>
          <UserName slug={data.userId} />
  </Suspense> 
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          {data.desc}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
