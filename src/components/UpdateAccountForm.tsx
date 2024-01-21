"use client"

import { updateAccount } from "@/app/actions"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"

type Props = {
    softRedirect?: boolean;
    initialValues?: User | null
}

export default function UpdateAccountForm (props : Props) {
    const [state, formAction] = useFormState(updateAccount, {
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
            <h1 className='text-4xl font-bold text-gray-700'>Update Account Information</h1>
            <form className='flex flex-col gap-4' action={formAction}>
              <input required type="text" name='name' placeholder="Full Name" autoComplete='name' className="input input-bordered w-full text-base-content" defaultValue={props.initialValues?.name as string} />
              <input required type="tel" name='tel' placeholder="Phone number. Ex. 101-111-1111" autoComplete='tel' className="input input-bordered w-full text-base-content"  defaultValue={props.initialValues?.tel} />
              <select required name='bloodType' className="select text-base-content w-full"  defaultValue={props.initialValues?.bloodType || "Blood Type"} >
                <option disabled>Blood Type</option>
                <option value='UNKNOWN'>Unknown</option>
                <option value='OPOSITIVE'>O+</option>
                <option value='ONEGATIVE'>O-</option>
                <option value='ABPOSTIVE'>AB+</option>
                <option value='ABNEGATIVE'>AB-</option>
                <option value='APOSITIVE'>A+</option>
                <option value='ANEGATIVE'>A-</option>
                <option value='BPOSITIVE'>B+</option>
                <option value='BNEGATIVE'>B-</option>
              </select>
              <textarea name='additionalInfo' placeholder="(Optional) Please list any allergies, medications, or other relevant health information." className="textarea textarea-bordered text-base-content" defaultValue={props.initialValues?.additionalInfo as string} />
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-base-content">Do you have any medical experience and are willing to help out?</span> 
                  <input type="checkbox" name="medicalExp" className="checkbox checkbox-primary" defaultChecked={props.initialValues?.medicalExp as boolean}  />
                </label>
              </div>
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
  