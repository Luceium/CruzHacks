"use client"
import prisma from '@/lib/prisma'
import { Event, User } from '@prisma/client'
import React from 'react'

const UserEvent = async (props : {user: User, event : Event}) => {
  if (!props.event.userIds.some(id => id == props.user.id)) {
    await prisma.event.update({
      'where': {id: props.event.id},
      'data': {
        users: {
          connect: {
            id: props.user.id
          }
        }
      }
    })
  }
  async function emergency(){
    const req = {
      id:props.event.id,
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
    <div className='py-20'>
      <button className = "bg-red-500" onClick={emergency}>
        Emergency
      </button>
    </div>
  )
}

export default UserEvent