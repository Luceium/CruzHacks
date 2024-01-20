import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import prisma from '@/lib/prisma';
import MultiInput from '@/components/MultiInput';
import { getSession } from '@auth0/nextjs-auth0';


export default function AddEvent(){
    async function submitEvent(formData: FormData) {
        "use server"

        const session = await getSession();
        if (!session) {
            //TODO: Handle
            return;
        }

        
        await prisma.event.create({
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                location: formData.get("location") as string,
                users: {
                    connect: {
                        email: session.user.email
                    }
                },
                admins: {
                    connect: {
                        email: session.user.email
                    }
                }
            }
        })
    }

    return(
        <div className='md:flex justify-center'>
            <div className='flex flex-col px-4 py-32 gap-8'>
                <h1 className='text-4xl font-bold'>Add Event</h1>
                <form className='flex flex-col gap-4 text-primary' action={submitEvent}>
                    <input className='input input-large' name="title" placeholder='Event Name' />
                    <input className='input input-large' name="description" placeholder='Description' />
                    <input className='input input-large' name="location" placeholder='Location' />
                    <MultiInput name='admins' type='email' placeholder='Admin (by email)' initialValue={[]}/>
                    <button className='btn' type="submit">
                        Add Event
                    </button>
                </form>
            </div>
        </div>
    )
}