"use client"
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navbar() {
    const {user, isLoading} = useUser();
    return (
        <nav className="md:flex max-h-16 md:max-h-screen overflow-hidden justify-between px-8 py-6 bg-yellow-500">
            <div className="flex justify-between">
                <p>LOGO</p>
                <div>X</div>
            </div>
            <div className="flex gap-2">
                <a>Link 1</a>
                <a>Link 2</a>
            </div>
            <button className={isLoading ? "skeleton" : undefined} onClick={() => user ? 1 : 2}>{user ? "Logout" : "Login"}</button>
        </nav>
    )
}
