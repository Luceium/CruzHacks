import UserEventManager from '@/components/UserEventManager'
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
  return (
    <div className='py-20'>
      <UserEventManager user={props.user} event={props.event}/>
    </div>
  )
}

export default UserEvent