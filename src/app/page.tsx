import Link from "next/link";
import prisma from "../lib/prisma";
import { Event } from "@prisma/client";
import Enforce from "@/util/enforce";

async function getEvents() {
  const events = await prisma.event.findMany();
  return events;
}

const EventComponent = (event : Event) => {
  return(
    <Enforce>
      <div className="grid grid-cols-5 md:min-h-48 bg-primary p-4 rounded-lg gap-2 text-primary-content justify-center items-center">
        <div className="flex flex-col col-span-3">
          <div className="text-h-full text-2xl truncate">
            {event.title}
          </div>
          <div className="h-[50%] md:h-auto truncate">
            {event.location}
          </div>
        </div>
        <Link href={`/events/${event.id}`}>
          <button className="btn btn-secondary md:w-24 col-span-2">
            Join Event
          </button>
        </Link>
        <div className="truncate col-span-5">
          {event.description}
        </div>
      </div>
    </Enforce>
  )
}

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh)] py-24">
      <h2 className="p-8 md:p-12 text-4xl text-center font-extrabold tracking-tight text-gray-700 font-outline-2 lg:text-4xl">
        Slug it Out at Your Next Event...
      </h2>
      <div className="bg-gray-700 rounded-lg shadow-md
        w-[90%] md:w-[80%] grid md:grid-cols-3 gap-2 overflow-y-auto  min-h-[calc(50vh)] max-h-[55vh] p-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} {...event}/>
          ))
        ) : (
          <div className="flex flex-col col-span-3">
            <div className="text-3xl md:text-2xl text-center justify-center text-primary-content col-span-3 md:p-12">
              No events are currently available. 
              <br/><br/> 
              Click the button below to create a new event for others to join!
            </div>
            <div className="flex h-full justify-center items-center">
              <Link href="/addEvent" className="p-4">
                <button className="btn bg-secondary text-xl border-0">
                  Add Events
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
