import prisma from "@/lib/prisma"
import AdminEvent from "./adminEvent"
import UserEvent from "./userEvent"
import { getSession } from "@auth0/nextjs-auth0"

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

   const email = (await getSession())!.user.email
   const admins = eventData.admins
   const users = eventData.users
   const isAdmin = admins.some(a => a.email == email)

   return (isAdmin ? <AdminEvent admins={admins} users={users} event={eventData}/> : <UserEvent/>);
  }
