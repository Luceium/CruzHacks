"use client"

import { Event, User } from "@prisma/client";



export default function Emergency(props: {user: User, event: Event}) {
    async function emergency(){
        const req = {
          userId:props.user.id,
          eventId:props.event.id,
          type:"emergency"
        }
        const url = "http://localhost:1337"
    
        const res = await( await fetch(url, {
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(req),
          method: "POST"
        })).json();
      }
    
      return (
        <div>
          <button className = "bg-red-500" onClick={emergency}>
            Emergency
          </button>
        </div>
      )
}