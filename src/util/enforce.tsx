import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserByEmail } from "./getUserByEmail";
import UpdateAccountForm from "@/components/UpdateAccountForm";
import { redirect } from "next/navigation";

export default async function Enforce({children, shouldRedirect} : {children: any, shouldRedirect?: boolean}) {
        const session = await getSession();
        
        // redirect from home to events if logged in
        if (shouldRedirect) {
                if (session) redirect('/events')
                return children
        }
        
        const completedAccount = session ? await getUserByEmail(session.user.email) : null
        return (<>{completedAccount ? children : <UpdateAccountForm softRedirect/>}</>);
}