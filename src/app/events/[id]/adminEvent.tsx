import { Event, User } from "@prisma/client";
import UserList from "./userList";
import { addAdmin, addUser, removeAdmin, removeUser } from "@/app/actions";
import QRCodeComponent from "@/components/QRCode";

const AdminEvent = ({admins, user, users, event}: {admins: User[], user: User, users: User[], event: Event}) => {
  return (
    <div className="min-h-[calc(100vh)] pt-24 px-10 pb-10 grid grid-cols-4">

      {/* Left Column */}
      <div className="col-span-1 flex-col justify-center hidden md:flex">
        <div className="text-center tracking-tight text-gray-700 text-2xl">Attendees</div>
        <div className="bg-gray-700 rounded-lg shadow-md h-[90%]">
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
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-1 hidden md:flex flex-col gap-4 justify-center">
        <div className="text-center tracking-tight text-gray-700 text-2xl">Admins</div>
        <UserList users={admins} event={event} add={addAdmin} remove={removeAdmin}/>
        <div className="text-center tracking-tight text-gray-700 text-2xl">Medical Support</div>
        <div className="bg-gray-700 rounded-lg shadow-md h-[30%] p-4">
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
  )
}

export default AdminEvent