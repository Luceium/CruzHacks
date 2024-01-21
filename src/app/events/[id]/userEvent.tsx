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
    <div>UserEvent</div>
  )
}

export default UserEvent