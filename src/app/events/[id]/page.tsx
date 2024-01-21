import prisma from "@/lib/prisma"
import AdminEvent from "./adminEvent"
import UserEvent from "./userEvent"

export default async function Page({ params }: { params: { id: string} }) {
    const id = params.id
    const eventData = await prisma.event.findUnique({
        where: {
            id
        },
        include: {
            admins: true,
            users: true
        }
    })
    if (!eventData) {
        console.log("Cannot find event")
        return false    
    }

   const admins = eventData.admins
   const users = eventData.users
   const duh = true

   return (duh ? <AdminEvent admins={admins} users={users} event={eventData}/> : <UserEvent/>);
  }
