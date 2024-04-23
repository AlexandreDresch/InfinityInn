import { AlignLeft, Search } from "lucide-react";

import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="flex w-full items-center px-10 py-12 relative justify-between text-white bg-primary">
        <div className="flex gap-2 align-baseline">
        <AlignLeft /> 
        <Search className="hidden md:block"/>
        </div>

        <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Infinity Inn" />
        </a>

        <div className="gap-4 hidden md:flex">
            <a href="/sign-in" className="uppercase tracking-wider">Sign in</a>
            <a href="/sign-up" className="uppercase tracking-wider">Join</a>
        </div>
    </header>
  )
}
