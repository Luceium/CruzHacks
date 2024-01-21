import { Event, User } from "@prisma/client";

const AdminEvent = ({admins, users, event}: {admins: User[], users: User[], event: Event}) => {
  return (
    <div className="min-h-[calc(100vh)] pt-24 px-10 pb-10 grid grid-cols-4">

      {/* Left Column */}
      <div className="col-span-1 flex flex-col justify-center">
        <div className="text-center tracking-tight text-gray-700 text-2xl">Attendees</div>
        <div className="bg-gray-700 rounded-lg shadow-md h-[90%]">
          {users.map((user) => {
              return(
                <div key={user.email}>
                  {user.email} - {user.tel}
                </div>
              ) 
            })}
        </div>
      </div>

      {/* Middle Column */}
      <div className="col-span-2 flex flex-col">
        <div className="flex flex-col h-[50%] gap-2">
          <div className="text-center tracking-tight text-primary text-4xl font-extrabold">
            {event.title}
          </div>
          <div className="text-center tracking-tight text-primary text-2xl">
            Location: {event.location}
          </div>
        </div>
        <div>

        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-1 flex flex-col gap-4 justify-center">
        <div className="text-center tracking-tight text-gray-700 text-2xl">Admins</div>
        <div className="bg-gray-700 rounded-lg shadow-md h-[45%] p-4">
          {admins.map((admin) => {
            return(
              <div key={admin.email}>
                {admin.email} - {admin.tel}
              </div>
            ) 
          })}
        </div>
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