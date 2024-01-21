import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserByEmail } from "./getUserByEmail";
import UpdateAccountForm from "@/components/UpdateAccountForm";

export default async function Enforce({children} : any) {
        const {user} = (await getSession())!;
        const userInfo = await getUserByEmail(user.email);
        return (<>{userInfo ? children : <UpdateAccountForm softRedirect/>}</>);
}