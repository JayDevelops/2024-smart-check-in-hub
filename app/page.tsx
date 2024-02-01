import Image from 'next/image'
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <Button>Button Testing</Button>
    </main>
  )
}
