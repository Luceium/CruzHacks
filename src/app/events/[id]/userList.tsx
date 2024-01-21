'use client'
import { addAdmin, removeAdmin } from '@/app/actions'
import MultiInput from '@/components/MultiInput'
import prisma from '@/lib/prisma'
import { User, Event } from '@prisma/client'
import React, { useState } from 'react'

const UserList = ({users: _users, event, add, remove}: {users: User[], event: Event, add: (event: Event, email: string) => Promise<User[]>, remove: (event: Event, email: string) => Promise<User[]>}) => {
  const [users, setUsers] = useState(_users);
  return (
    <div className="bg-gray-700 rounded-lg shadow-md h-[45%] p-4">
        <MultiInput className='text-base-content' initialValue={users.map(u => u.email)} onAdd={async (email) => {
            const newUsers = await add(event, email);
            setUsers(newUsers);
          }} onRemove={async (email) => {
            const newUsers = await remove(event, email);
            setUsers(newUsers);
          }}/>
    </div>
  )
}

export default UserList