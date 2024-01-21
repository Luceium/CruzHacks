import prisma from "@/lib/prisma"
import Enforce from "@/util/enforce"

export default async function Page({ params }: { params: { id: string} }) {
    const id = params.id
   const event = await prisma.event.findUnique({
    where: {
        id: id
    },
    include: {
        admins: true,
        users: true
    }
   })
   if (!event){
    console.log("Cannot find event")
    return false
}

   const admins = event.adminIds
   const users = []
   for (let i = 1; i <=100; i++){
    users.push(i.toString())
   }
   console.log(users)

   return (
    <div className="flex">
      {/* Left section */}
        {/* Left section */}
        <div className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Left Section</h2>
        {/* Add content for the left section */}
      </div>
      {/* Middle section */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Middle Section</h2>
        {/* Add content for the middle section */}
        <p>Middle</p>
      </div>
      {/* Right section */}
      <div className="w-1/4 p-4 border-l border-red-300">
        <h2 className="text-xl font-bold mb-4">Right Section</h2>
        <p>Right</p>
      </div>
    </div>
  );

  }
