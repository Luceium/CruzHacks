import prisma from "@/lib/prisma"

export default async function Page({ params }: { params: { id: string} }) {
    const id = params.id
    const event = await prisma.event.findUnique({
        where: {
            id
        },
        include: {
            admins: true,
            users: true
        }
    })
    if (!event) {
        console.log("Cannot find event")
        return false    
    }

   const admins = event.admins
   const users = event.users

   return (
    <div className="flex min-h-[calc(100vh)] p-24 grid grid-cols-4">
        {users.map((user) => {
          return(
            <div>
              {user.id}
              {user.email}
            </div>
          ) 
        })}
    </div>
  );

  }
