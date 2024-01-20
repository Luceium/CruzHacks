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
    <main className="flex flex-col items-center min-h-[calc(100vh)]">

      <h2 className="p-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
        Events
      </h2>
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 shadow-md dark:border-gray-700 
      w-[90%] md:w-[80%] grid lg:grid-cols-3 gap-2 overflow-y-auto  min-h-[calc(50vh)] max-h-[55vh] p-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} event={event} />
          ))
        ) : (
          <div className="text-3xl md:text-2xl text-center justify-center text-primary-content col-span-3">
            No events are currently available. <br/> Create a new event for others to join!
          </div>
        )}
      </div>
      
    </main>
  );
}
