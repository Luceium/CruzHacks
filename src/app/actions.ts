'use server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { getSession } from '@auth0/nextjs-auth0';
import { Event, User } from '@prisma/client';


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
    return await prisma.event.update({
        'where' : {id : event.id},
        'data' : {admins: {connect: {email}}},
        include: {
            admins: true
        }
    });
}

export async function removeAdmin(event: Event, email: string) {
    return await prisma.event.update({
        'where' : {id : event.id},
        'data' : {admins: {disconnect: {email}}},
        include: {
            admins: true
        }
    });
}