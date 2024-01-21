"use client"

import { createEmergency } from "@/app/actions";
import { Event, StatusType, User } from "@prisma/client";


export default function Emergency(props: {user: User, event: Event}) {
  async function emergency(){
    await createEmergency(props.user, props.event, StatusType.EMERGENCY)
  }

  return (
    <div>
      <button className = "bg-red-500" onClick={emergency}>
        Emergency
      </button>
    </div>
  )
}