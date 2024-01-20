import Image from "next/image";
import { getSession } from '@auth0/nextjs-auth0';


const EventComponent = () => {
  return(
    <div className="flex flex-col min-h-32 bg-primary p-4 rounded-lg gap-2 overflow-x-hidden">
      <div className="text-h-full text-3xl">
        Event Name
      </div>
      <div className="flex flex-col">
        <div className="h-[50%] md:h-auto truncate">
          Location: Some Building Name
        </div>
        <div className="truncate">
          Description: laksjf;laksdjfl;dsakjfs;adlfjas;dljfas;ldkjfas;ldkfjsa;ldkj
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  const session = await getSession();
  return (
    <main className="flex flex-col items-center justify-between">

      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
        Events
      </h2>
      <div className="bg-white dark:bg-gray-900 min-h-[calc(100vh-86px)] border border-gray-200 shadow-md dark:border-gray-700 max-w-[90%] md:max-w-[80%] grid lg:grid-cols-3 gap-2 overflow-y-auto max-h-[55vh] p-4 rounded-lg">
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
        <EventComponent/>
      </div>
      
    </main>
  );
}
