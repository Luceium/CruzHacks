"use client"

import { createEmergency } from "@/app/actions";
import { Event, StatusType, User } from "@prisma/client";
import { useState } from "react";
import Incident from "./Incident";


export default function UserEventManager({user, event}: {user: User, event: Event}) {
  const [call, checkCall] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const template = (incidentLevel: string, problem: string) => {
    return `${incidentLevel}: ${user.name} is experiencing ${problem}.
     ${user.name}'s phone number is ${user.tel}. ${user.name} does ${call ? '' : 'not'} want to be called${call ? '.': " but, feel free to text " + user.name + " for more information."}`
  }

  async function postIncident(message: string, type: StatusType){
    setSubmitting(true)
    await createEmergency(user, event, type, message)
    setSubmitting(false)
  }

  return (
    <div className='py-20 min-h-screen w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-10'>
        <h1 className='title text-5xl mb-20 text-secondary-content'>{event.title}</h1>
        <Incident submitting={submitting} text="Emergency" btnColor='btn-error'>
          <button className='btn' onClick={() => (postIncident(template("Emergency", "a medical emergency or witnessing one"), StatusType.EMERGENCY))}>
            Medical Emergency
          </button>
          <button className='btn' onClick={() => (postIncident(template("Emergency", "violence or reporting it"), StatusType.EMERGENCY))}>
            Violence
          </button>
          <button className='btn' onClick={() => (postIncident(template("Emergency", "sexual harrasment or assult, or reporting it"), StatusType.EMERGENCY))}>
            SA / SH
          </button>
        </Incident>
        <Incident submitting={submitting} text="Report"  btnColor='btn-warning'>
          <button className='btn' onClick={() => {postIncident(template("Report", "seeing suspicous activity"), StatusType.HELP)}}>
            Suspicious Activity
          </button>
          <button className='btn' onClick={() => {postIncident(template("Report", "an issue and is requesting assistance"), StatusType.HELP)}}>
            Assistance Needed
          </button>
          <button className='btn' onClick={() => {postIncident(template("Report", "another disturbance and is requesting an organizer"), StatusType.HELP)}}>
            Other Disturbances
          </button>
        </Incident>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Do you want someone to call you?</span> 
            <input type="checkbox" checked={call} className="checkbox" onChange={() => checkCall(!call)} />
          </label>
        </div>
      </div>
    </div>
  )
}