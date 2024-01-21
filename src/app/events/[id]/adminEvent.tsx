"use client"

import { Emergency as _Emergency, Event, User } from "@prisma/client";
import UserList from "./userList";
import { addAdmin, addUser, removeAdmin, removeUser } from "@/app/actions";
import { useEffect, useState } from "react";
import QRCodeComponent from "@/components/QRCode";
import dayjs from "dayjs";

type Emergency = _Emergency & {
  user: User
}

const AdminEvent = ({admins, users, emergencies: _emergencies, event}: {admins: User[], users: User[], emergencies: Emergency[], event: Event}) => {
  const [emergencies, setEmergencies] = useState(_emergencies)
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1337');

    ws.onopen = () =>{
      ws.send(event.id);
    }
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "create":
          var audio = new Audio(data.sound);
          audio.play();

          setEmergencies(emergencies => [data.emergency, ...emergencies])
          break;
        case "delete":
          setEmergencies(emergencies => emergencies.filter(emergency => emergency.id != data.emergency.id))
          break;
      }
    };

    return () => ws.close();
  }, [])

  return (
    <div className="min-h-[calc(100vh)] pt-24 px-10 pb-10 grid grid-cols-2 md:grid-cols-4">

      {/* Left Column */}
      <div className="col-span-1 flex-col hidden md:flex mt-28">
        <div className="flex flex-col gap-4 min-h-96">
          <div className="text-center tracking-tight text-gray-700 text-2xl">Attendees</div>
          <UserList users={users} event={event} add={addUser} remove={removeUser}/>
        </div>
      </div>

      {/* Middle Column */}
      <div className="col-span-2 flex flex-col">
        <div className="flex flex-col h-[50%] gap-2 text-center">
          <div className="flex justify-center text-center gap-2">
            <div className="text-center tracking-tight text-primary text-4xl font-extrabold">
              {event.title}
            </div>
            <QRCodeComponent size={40}/>
          </div>
          <div className="text-center tracking-tight text-primary text-2xl">
            Location: {event.location}
          </div>
          <div className="flex flex-col gap-3 mt-16 px-8">
            {emergencies.sort((a, b) => {
              if (a.type === "EMERGENCY" && b.type === "HELP") {
                return -1;
              }
              return a.time.getTime() - b.time.getTime();
            }).map((emergency) => {
              return <div key={emergency.id} className="bg-gray-700 text-left p-4 rounded-lg animate-notification relative">
                <p><span className="font-bold">Reporter</span>: {emergency.user.name}</p> 
                <p><span className="font-bold">Phone</span>: {emergency.user.tel}</p> 
                <p><span className="font-bold">Time</span>: {dayjs(emergency.time).format("MMMM D, YYYY, h:mm A")}</p> 
                <p><span className="font-bold">Message</span>: {emergency.message}</p>
              </div>
            })}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-1 hidden md:flex flex-col mt-28 gap-4">
        <div className="flex flex-col gap-4 min-h-96">
          <div className="text-center tracking-tight text-gray-700 text-2xl">Admins</div>
          <UserList users={admins} event={event} add={addAdmin} remove={removeAdmin}/>
        </div>
        <div>
          <div className="flex flex-col gap-4 min-h-96">
            <div className="text-center tracking-tight text-gray-700 text-2xl">Medical Support</div>
            <div className="bg-gray-700 rounded-lg shadow-md p-4">
              {users.filter(user => user.medicalExp).map((user) => {
                return(
                  <div key={user.email}>
                    {user.email} - {user.tel}
                  </div>
                ) 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEvent