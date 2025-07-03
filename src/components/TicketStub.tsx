import { Setlist } from "../types/setlist";
// import { useState } from 'react';

interface TicketStubProps {
  setlist: Setlist;
}

export default function TicketStub({ setlist }: TicketStubProps) {
  const getDateComponents = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return {
      day: day,
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      year: year,
    };
  };

  const dateComponents = getDateComponents(setlist.eventDate);

  return (
    <div className="bg-white border border-gray-300 p-6 flex w-120 h-50 text-black items-center">
      <div className="">
        <div className="border-b border-black w-72">
          <div>{setlist.tour?.name}</div>
          <div className="font-bold">{setlist.artist.name.toUpperCase()}</div>
        </div>
        <div className="flex">
          <div className="flex flex-col border-r border-black p-2">
            <div>{dateComponents.month}</div>
            <div>{dateComponents.day}</div>
            <div>{dateComponents.year}</div>
          </div>
          <div className="flex-1 flex flex-col p-2">
            <div>{setlist.venue.name}</div>
            <div>
              {setlist.venue.city.name}, {setlist.venue.city.state}
            </div>
            <div>{setlist.venue.city.country.name}</div>
          </div>
        </div>
      </div>
      <div className="transform rotate-270 origin-center text-center">
        <div>NO REFUNDS OR EXCHANGES</div>
        <div>Test</div>
      </div>
    </div>
  );
}
