"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import classNames from "classnames";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import sleepySlug from "../../assets/sleepy-slug.png"
import Image from "next/image"

export default function Navbar() {
    const [toggled, setToggled] = useState(false);
    const {user, isLoading} = useUser();
    return (
        <nav className={classNames("bg-primary text-xl absolute top-0 w-full md:flex overflow-hidden md:justify-between md:items-center px-8 py-6 transition-all duration-200 ease-in-out", {"max-h-screen": toggled, "max-h-16": !toggled})}>
            <div className="flex justify-between">
                <Image src={sleepySlug} alt="" className="w-8 h-8 md:w-16 md:h-16" width="64" height="64"/>
                <div className="inline md:hidden" onClick={() => setToggled(!toggled)}>
                    <IoMenu className="h-8 w-8"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-4 md:my-0">
                <a>Link 1</a>
                <a>Link 2</a>
            </div>
            <div>
                {isLoading ? 
                    <div className="loading loading-spinner"></div> :
                    <div className="flex items-center gap-2 md:gap-4">
                        {user?.picture && <img className="rounded-full h-8 md:h-12" src={user.picture}/>}
                        <a href={user ? "/api/auth/logout" : "/api/auth/login"}>{user ? "Logout" : "Login"}</a>
                    </div>
                }
            </div>
        </nav>
    )
}
