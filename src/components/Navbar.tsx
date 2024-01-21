"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import classNames from "classnames";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import slug from "../../assets/safeandslug.png"
import Image from "next/image"
import Link from "next/link";

export default function Navbar() {
    const [toggled, setToggled] = useState(false);
    const {user, isLoading} = useUser();
    return (
        <nav className={classNames("bg-primary text-xl absolute top-0 w-full md:flex overflow-hidden md:justify-between md:items-center px-8 py-2 md:py-6 pb-6 transition-all duration-200 ease-in-out", {"max-h-screen md:max-h-16": toggled, "max-h-16": !toggled})}>
            <div className="flex justify-between">
                    <Link className="flex gap-2 items-center" href="/">
                        <Image src={slug} alt="logo" className="w-12 h-12 p-2" width="64" height="64"/>
                        <span className="text-2xl font-bold">Safe and Slug</span>
                    </Link>
                <div className="flex items-center md:hidden" onClick={() => setToggled(!toggled)}>
                    <IoMenu className="h-8 w-8"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-4 md:my-0">
                <Link href="/">Home</Link>
                <Link className="mx-2" href="/addEvent">Create Event</Link>
                <Link href="/account">Update Profile</Link>
            </div>
            <div>
                {isLoading ? 
                    <div className="loading loading-spinner"></div> :
                    <div className="flex items-center gap-2 md:gap-4">
                        {user?.picture && <Link href="/account"><img className="rounded-full h-8 md:h-12" src={user.picture}/></Link>}
                        <a href={user ? "/api/auth/logout" : "/api/auth/login"}>{user ? "Logout" : "Login"}</a>
                    </div>
                }
            </div>
        </nav>
    )
}
