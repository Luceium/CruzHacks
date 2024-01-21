import React from 'react'
import UpdateAccountForm from "@/components/UpdateAccountForm";
import { getSession } from '@auth0/nextjs-auth0';
import { getUserByEmail } from '@/util/getUserByEmail';

export default async function UpdateAccount () {
  const email = (await getSession())!.user.email;
  const userInfo = await getUserByEmail(email);

  return <UpdateAccountForm initialValues={userInfo}/>
}
