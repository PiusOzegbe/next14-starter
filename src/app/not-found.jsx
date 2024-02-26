import Link from "next/link"

const NotFound = () => {
  return (
    <div>
      <h1>NotFound</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Return to HomePage</Link>
    </div>
  )
}

export default NotFound
