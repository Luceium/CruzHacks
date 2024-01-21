'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { updateHealth } from '../actions'
import { useRouter } from 'next/navigation'

export default function UpdateHealth (props : any) {
  const [state, formAction] = useFormState(updateHealth, {
    errors: "",
    softRedirect: props.softRedirect,
    refresh: false
  })
  const router = useRouter()
  if (state.refresh) {
    router.refresh()
  }

  return (
    <div className='md:flex justify-center min-h-[calc(100vh)]'>
      <div className='flex flex-col px-4 py-32 gap-8'>
          <h1 className='text-4xl font-bold'>Update Health Information</h1>
          <form className='flex flex-col gap-4' action={formAction}>
            <input required type="text" name='name' placeholder="Full Name" autoComplete='name' className="input input-bordered w-full text-base-content" />
            <input required type="tel" name='tel' placeholder="Phone number. Ex. 101-111-1111" autoComplete='tel' className="input input-bordered w-full text-base-content" />
            <select required defaultValue="Blood Type" name='bloodType' className="select text-base-content w-full">
              <option disabled>Blood Type</option>
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
          {state.errors.includes("bloodType") && <p>Please select a blood type.</p>}
          {state.errors.includes("tel") && <p>Please input a phone number in the format ddd-ddd-dddd.</p>}
      </div>
    </div>
  )
}
