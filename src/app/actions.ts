'use server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { getSession } from '@auth0/nextjs-auth0';
import { Emergency, Event, StatusType, User } from '@prisma/client';


const schema = z.object({
    name : z.string().regex(/[a-zA-Z ]+/g),
    tel : z.string().regex(/\d{3}-?\d{3}-?\d{4}/g),
    email : z.string().email(),
    bloodType : z.union([
        z.literal("OPOSITIVE"),
        z.literal("ONEGATIVE"),
        z.literal("APOSITIVE"),
        z.literal("ANEGATIVE"),
        z.literal("BPOSITIVE"),
        z.literal("BNEGATIVE"),
        z.literal("AB"),
        z.literal("UNKNOWN")
    ]),
    additionalInfo : z.optional(z.string()),
    medicalExp: z.union([
        z.literal("on"),
        z.literal("off"),
        z.null()
    ])
})

export async function updateAccount(prevState: any, formData : FormData) {
    const {user} = (await getSession())!

    const validatedFields = schema.safeParse({
        name : formData.get('name'),
        tel : formData.get('tel'),
        email : user.email,
        bloodType : formData.get('bloodType'),
        additionalInfo : formData.get('additionalInfo'),
        medicalExp: formData.get('medicalExp')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.message,
        }
    }

    const finalFields = {...validatedFields.data, medicalExp: validatedFields.data.medicalExp === "on"};
    await prisma.user.upsert({
        where: {email: user.email},
        update: finalFields,
        create: finalFields
    })

    if (!prevState.softRedirect) {
        redirect('/')
    }

    return {...prevState, errors: "", refresh: true};
}

export async function addAdmin(event: Event, email: string) {
    return (await prisma.event.update({
        'where' : {id : event.id},
        'data' : {admins: {connect: {email}}, users: {disconnect: {email}}},
        include: {
            admins: true
        }
    })).admins;
}

export async function removeAdmin(event: Event, email: string) {
    return (await prisma.event.update({
        'where' : {id : event.id},
        'data' : {admins: {disconnect: {email}}},
        include: {
            admins: true
        }
    })).admins;
}
export async function removeUser(event: Event, email: string) {
    return (await prisma.event.update({
        'where' : {id : event.id},
        'data' : {users: {disconnect: {email}}},
        include: {
            users: true
        }
    })).users;
}

export async function addUser(event: Event, email: string) {
    return (await prisma.event.update({
        'where' : {id : event.id},
        'data' : {users: {connect: {email}}},
        include: {
            users: true
        }
    })).users;
}

export async function createEmergency(user: User, event: Event, type: StatusType, message: string){
    const newEmergency = await prisma.emergency.create({
        data: {
            user: {
                connect: {
                    id: user.id
                }
            },
            event: {
                connect: {
                    id: event.id
                }
            },
            time: new Date(),
            type,
            message
        },
        include: {
            user: true
        }
    });

    try {
        const url = "http://localhost:1337/create"
        await(await fetch(url, {
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sound: "",
                emergency: newEmergency,
                event
                }),
            method: "POST"
        })).json();
    } catch {}
    return newEmergency;
}

export async function deleteEmergency(emergency: Emergency, event: Event){
    const oldEmergency = await prisma.emergency.delete({
        where: {
            id: emergency.id
        }
    });

    try {
        const url = "http://localhost:1337/delete"
        await(await fetch(url, {
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emergency: oldEmergency,
                event
            }),
            method: "POST"
        })).json();
    } catch {}
    return oldEmergency;
}