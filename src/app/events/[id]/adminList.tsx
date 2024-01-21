'use client'
import { addAdmin, removeAdmin } from '@/app/actions'
import MultiInput from '@/components/MultiInput'
import prisma from '@/lib/prisma'
import { User, Event } from '@prisma/client'
import React, { useState } from 'react'

const AdminList = ({admins: _admins, user, event}: {admins: User[], user: User, event: Event}) => {
  const [admins, setAdmins] = useState(_admins);
  return (
    <div className="bg-gray-700 rounded-lg shadow-md h-[45%] p-4">
        <MultiInput className='text-base-content' initialValue={admins.map(a => a.email)} onAdd={async (email) => {
            const newEvent = await addAdmin(event, email);
            setAdmins(newEvent.admins);
          }} onRemove={async (email) => {
            const newEvent = await removeAdmin(event, email);
            setAdmins(newEvent.admins);
          }}/>
    </div>
  )
}

export default AdminList