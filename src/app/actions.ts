'use server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { getSession } from '@auth0/nextjs-auth0';


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
    additionalInfo : z.optional(z.string())
})

export async function updateHealth(prevState: any, formData : FormData) {
    const {user} = (await getSession())!

    const validatedFields = schema.safeParse({
        name : formData.get('name'),
        tel : formData.get('tel'),
        email : user.email,
        bloodType : formData.get('bloodType'),
        additionalInfo : formData.get('additionalInfo')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.message,
        }
    }

    console.log(validatedFields.data)
    await prisma.user.upsert({
        where: {email: user.email},
        update: validatedFields.data,
        create: validatedFields.data
    })

    if (!prevState.softRedirect) {
        redirect('/')
    }

    return {...prevState, errors: "", refresh: true};
}