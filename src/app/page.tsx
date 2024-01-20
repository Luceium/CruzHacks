import prisma from "../lib/prisma"; 

async function getEvents() {
  const events = await prisma.event.findMany();
  console.log(events)
  return events;
}

const EventComponent = (event : any) => {
  return(
    <div className="flex flex-col min-h-32 bg-primary p-4 rounded-lg gap-2 overflow-x-hidden text-primary-content">
      <div className="text-h-full text-3xl">
        {event.name}
      </div>
      <div className="flex flex-col">
        <div className="h-[50%] md:h-auto truncate">
          {event.location}
        </div>
        <div className="truncate">
          {event.description}
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  const events = await getEvents();
  return (
    <main className="flex flex-col items-center justify-between">

      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
        Events
      </h2>
      <div className="bg-white dark:bg-gray-900 min-h-[calc(100vh-150px)] mb-10 border border-gray-200 shadow-md dark:border-gray-700 w-[90%] md:w-[80%] grid lg:grid-cols-3 gap-2 overflow-y-auto max-h-[55vh] p-4 rounded-lg">
        {events.map((event) => (
          <EventComponent key={event.id} event={event} />
        ))}
      </div>
      
    </main>
  );
}
