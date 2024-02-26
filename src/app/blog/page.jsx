import { getPosts } from "@/lib/data"
import styles from "./blog.module.css"
import PostCard from "@/components/postCard/postCard"
import next from "next"

  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}})

    if (!res.ok) {
      throw new Error("something went wrong")
    }

    return res.json()
  }

const BlogPage = async () => {
  const data = await getData()

  return (
    <div className={styles.container}>
      {
        data.map(dat => (
          <div key={dat.userId} className={styles.post}>
          <PostCard post={dat} title={dat.title} body={dat.desc} id={dat.userId} />
          </div>
        ))
      }
    </div>
  )
}

export default BlogPage