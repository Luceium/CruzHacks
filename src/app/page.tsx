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

      <h2 className="p-8 md:p-12 text-4xl text-center font-extrabold tracking-tight text-gray-700 font-outline-2 lg:text-4xl">
        Slug it Out at Your Next Event...
      </h2>
      <div className="bg-primary rounded-lg shadow-md border-white border-4
      w-[90%] md:w-[80%] grid lg:grid-cols-3 gap-2 overflow-y-auto  min-h-[calc(50vh)] max-h-[55vh] p-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} event={event} />
          ))
        ) : (
          <div className="flex flex-col col-span-3">
            <div className="text-3xl md:text-2xl text-center justify-center text-primary-content col-span-3 md:p-12">
              No events are currently available. 
              <br/><br/> 
              Click the button below to create a new event for others to join!
            </div>
            <div className="flex h-full justify-center items-center">
              <a href="/addEvent" className="p-4">
                <button className="btn bg-secondary text-xl border-0">
                  Add Events
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
      
    </main>
  );
}
