import { BloodType, Prisma } from '@prisma/client'
import { getPrismaClient } from '@prisma/client/runtime/library'
import prisma from '@/lib/prisma'
import React from 'react'
import { z } from 'zod'
import { redirect } from 'next/navigation'

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

const updateHealth = async (formData : FormData) => {
  'use server'
  const result = schema.safeParse({
    name : formData.get('name'),
    tel : formData.get('tel'),
    email : formData.get('email'),
    bloodType : formData.get('bloodType'),
    additionalInfo : formData.get('additionalInfo')
  })

  if (result.success) {
    await prisma.user.create({
      data: result.data
    })
  } else {
    console.log(result.error)
    return result.error
  }

  redirect('/')
}

const Signup = () => {


  return (
    <div className='md:flex justify-center min-h-[calc(100vh)]'>
      <div className='flex flex-col px-4 py-32 gap-8'>
          <h1 className='text-4xl font-bold'>Update Health Information</h1>
          <form className='flex flex-col gap-4' action={updateHealth}>
            <input required type="text" name='name' placeholder="Full Name" autoComplete='name' className="input input-bordered w-full text-base-content" />
            <input required type="tel" name='tel' placeholder="Phone number. Ex. 101-111-1111" autoComplete='tel' className="input input-bordered w-full text-base-content" />
            <input required type="email" name='email' placeholder="Email" autoComplete='email' className="input input-bordered w-full text-base-content" />
            <select required name='bloodType' className="select text-base-content w-full text-base-content">
              <option disabled selected>Blood Type</option>
              <option value='UNKNOWN'>Unknown</option>
              <option value='OPOSITIVE'>O+</option>
              <option value='ONEGATIVE'>O-</option>
              <option value='AB'>AB</option>
              <option value='APOSITIVE'>A+</option>
              <option value='ANEGATIVE'>A-</option>
              <option value='BPOSITIVE'>B+</option>
              <option value='BNEGATIVE'>B-</option>
            </select>
            <textarea name='additionalInfo' placeholder="( optional ) Please list any allergies, medications, or other relevant health information." className="textarea textarea-bordered text-base-content"/>
            <button className='btn' type="submit">
              Update
            </button>
          </form>
          <p></p>
      </div>
    </div>
  )
}

export default Signup