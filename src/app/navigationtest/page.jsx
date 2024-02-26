"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NavigationTestPage = () => {
    const router = useRouter()

    const handleClick = () => {
        console.log("you clicked me")
        router.push("/")
    }

  return (
    <div>
        <Link href="/" prefetch={false}>Back to homepage</Link>
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default NavigationTestPage