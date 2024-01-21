import prisma from "@/lib/prisma"
import AdminEvent from "./adminEvent"
import UserEvent from "./userEvent"
import { Session, getSession } from "@auth0/nextjs-auth0"
import { getUserByEmail } from "@/util/getUserByEmail"

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

   const session : Session = (await getSession())!
   const user = (await getUserByEmail(session.user.email))!
   const admins = eventData.admins
   const users = eventData.users
   const isAdmin = admins.some(a => a.email == user.email)

   return (isAdmin ? <AdminEvent admins={admins} users={users} event={eventData}/> : <UserEvent event={eventData} user={user} />);
  }
