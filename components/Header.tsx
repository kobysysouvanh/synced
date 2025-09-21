import { Button } from "./ui/button"

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 max-w-[90rem] mx-auto">
      <h1 className="font-bold text-4xl tracking-[60%] text-neutral-900">SYNCED</h1>
      <div className="flex space-x-2">
        <Button variant={"ghost"} className="hover:bg-transparent" size={"lg"}>Sign Up</Button>
        <Button size={"lg"}>Log In</Button>
      </div>
    </div>
  )
}
export default Header