'use client'
import MultiInput from '@/components/MultiInput'
import { User, Event } from '@prisma/client'
import React, { useEffect, useState } from 'react'

const UserList = ({title, users: _users, event, add, remove}: {title: string, users: User[], event: Event, add: (event: Event, email: string) => Promise<User[]>, remove: (event: Event, email: string) => Promise<User[]>}) => {
  const [users, setUsers] = useState(_users);
  useEffect(() => {
    setUsers(_users);
  }, [_users]);

  return (
    <>
      <div className="text-center tracking-tight text-gray-700 text-2xl">{title} ({users.length})</div>
      <div className="bg-gray-700 rounded-lg shadow-md h-full">
        <MultiInput className='text-base-content m-4' initialValue={users.map(u => u.email)} dontUpdateImmediately={true} onAdd={async (email) => {
            const newUsers = await add(event, email);
            setUsers(newUsers);
          }} onRemove={async (email) => {
            const newUsers = await remove(event, email);
            setUsers(newUsers);
          }}/>
      </div>
    </>
  )
}

export default UserList