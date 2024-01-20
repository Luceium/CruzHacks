import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserByEmail } from "./getUserByEmail";
import { redirect } from "next/navigation";

export default async function Enforce({children} : any) {
        const {user} = (await getSession())!;
        const userInfo = await getUserByEmail(user.email);

        if (!userInfo) {
            redirect("/update-health");
        }
        console.log(children)
        return (<>{children}</>);
}