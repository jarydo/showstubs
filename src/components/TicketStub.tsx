import { Setlist } from "../types/setlist";
import { useState, useEffect } from "react";

interface TicketStubProps {
  setlist: Setlist;
}

export default function TicketStub({ setlist }: TicketStubProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [colorVariant, setColorVariant] = useState(1);

  // Define 8 color variants for the ticket
  const colorVariants = {
    1: "bg-red-100",
    2: "bg-blue-100",
    3: "bg-green-100",
    4: "bg-yellow-100",
    5: "bg-purple-100",
    6: "bg-pink-100",
    7: "bg-orange-100",
    8: "bg-teal-100",
  };

  const selectedColor =
    colorVariants[colorVariant as keyof typeof colorVariants];

  // Randomly select a color variant on component mount
  useEffect(() => {
    const randomColor = Math.floor(Math.random() * 8) + 1;
    setColorVariant(randomColor);
  }, []);

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

  const handleTicketClick = () => {
    setIsFlipped(!isFlipped);
  };

  const getAllSongs = () => {
    const songs: string[] = [];
    if (setlist.sets?.set) {
      setlist.sets.set.forEach((set) => {
        if (set.song) {
          set.song.forEach((song) => {
            songs.push(song.name);
          });
        }
      });
    }
    return songs;
  };

  const allSongs = getAllSongs();

  return (
    <div
      onClick={handleTicketClick}
      className="group cursor-pointer perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative 
          w-80 h-32 sm:w-96 sm:h-40 md:w-[480px] md:h-48 lg:w-120 lg:h-50
          transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? "rotate-x-180" : ""
          }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front of ticket */}
        <div
          className={`absolute inset-0 ${selectedColor} border border-gray-400 
            py-3 px-2 sm:py-4 sm:px-3 md:py-5 md:px-4 lg:py-6 lg:px-4
            flex text-black items-center backface-hidden`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url(/img/PaperTexture.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div className="flex items-center justify-center w-6 sm:w-8 md:w-9 lg:w-10 shrink-0">
            <div className="transform rotate-270 origin-center text-center">
              <div
                className="flex items-center justify-center bg-white 
                h-6 w-[126px] md:h-8 sm:w-[159px] lg:h-9 lg:w-[199px]
                font-stampete tracking-widest whitespace-nowrap 
                text-xs sm:text-sm md:text-base"
              >
                <a href={setlist.url} target="_blank">
                  {setlist.id.slice(-6)}
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 ml-2 sm:ml-3 md:ml-4">
            <div className="border-b border-black">
              <div className="text-xs sm:text-sm md:text-base truncate">
                {setlist.tour?.name}
              </div>
              <div className="font-bold text-sm sm:text-base md:text-lg">
                {setlist.artist.name.toUpperCase()}
              </div>
            </div>
            <div className="flex">
              <div
                className="flex flex-col border-r border-black 
                p-1 sm:p-1.5 md:p-2 
                text-xs sm:text-sm md:text-base"
              >
                <div>{dateComponents.month}</div>
                <div>{dateComponents.day}</div>
                <div>{dateComponents.year}</div>
              </div>
              <div
                className="flex-1 flex flex-col 
                p-1 sm:p-1.5 md:p-2 
                text-xs sm:text-sm md:text-base"
              >
                <div className="truncate">{setlist.venue?.name}</div>
                <div className="truncate">
                  {setlist.venue?.city?.name}, {setlist.venue?.city?.state}
                </div>
                <div className="truncate">
                  {setlist.venue?.city?.country?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-8 sm:w-10 md:w-11 lg:w-12 shrink-0">
            <div className="transform rotate-270 origin-center text-center">
              <div className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] whitespace-nowrap">
                NO REFUNDS OR EXCHANGES
              </div>
            </div>
          </div>
        </div>

        {/* Back of ticket */}
        <div
          className="absolute inset-0 overflow-hidden bg-gray-50 border border-gray-400 
            p-1 sm:p-1.5 md:p-2 
            backface-hidden flex"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          <div className="w-8 sm:w-10 md:w-11 lg:w-12 flex flex-col justify-between">
            <div
              className="bg-black flex-1 
              w-5 sm:w-6 md:w-7 lg:w-9 
              ml-1 sm:ml-1.5 md:ml-2 
              -mt-1 sm:-mt-2 md:-mt-3"
            ></div>
            <div>
              <div className="text-sm sm:text-lg md:text-xl font-bold text-blue-800 transform -rotate-1 inline-block font-applause">
                SETLIST
              </div>
            </div>
            <div
              className="bg-black flex-1 
              w-5 sm:w-6 md:w-7 lg:w-9 
              ml-1 sm:ml-1.5 md:ml-2 
              -mb-1 sm:-mb-2 md:-mb-3"
            ></div>
          </div>

          {/* Right side - Song grid */}
          <div
            className="flex-1 ml-2 sm:ml-3 md:ml-4 font-applause text-blue-800 
            text-[10px] sm:text-xs md:text-sm"
          >
            {allSongs.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-0.5 sm:gap-y-1 h-full content-start overflow-hidden">
                <div className="space-y-0.5 sm:space-y-1">
                  {allSongs.slice(0, 7).map((song, index) => (
                    <div
                      key={index}
                      className="leading-tight transform truncate"
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
                        marginLeft: `${Math.random() * 2}px`,
                      }}
                    >
                      {index + 1}. {song}
                    </div>
                  ))}
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  {allSongs.slice(7, 14).map((song, index) => (
                    <div
                      key={index + 7}
                      className="leading-tight transform truncate"
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
                        marginLeft: `${Math.random() * 2}px`,
                      }}
                    >
                      {index + 8}. {song}
                    </div>
                  ))}
                </div>

                <div className="space-y-0.5 sm:space-y-1 hidden sm:block">
                  {allSongs.slice(14, 21).map((song, index) => (
                    <div
                      key={index + 14}
                      className="leading-tight transform truncate"
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
                        marginLeft: `${Math.random() * 2}px`,
                      }}
                    >
                      {index + 15}. {song}
                    </div>
                  ))}
                  {/* Show overflow indicator if more than 21 songs */}
                  {allSongs.length > 21 && (
                    <div className="text-[8px] sm:text-xs text-gray-400 italic mt-1 sm:mt-2">
                      + {allSongs.length - 21} more songs...
                    </div>
                  )}
                </div>

                {/* Mobile overflow indicator for 2-column layout */}
                {allSongs.length > 14 && (
                  <div className="text-[8px] text-gray-400 italic mt-1 col-span-2 sm:hidden">
                    + {allSongs.length - 14} more songs...
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[8px] sm:text-xs text-gray-500 italic transform rotate-1 mt-2 sm:mt-4">
                no setlist available
              </div>
            )}
          </div>

          {/* Background watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-3">
            <div className="text-[6px] sm:text-[8px] md:text-xs text-black leading-tight max-w-full whitespace-pre-wrap text-center transform rotate-45">
              {Array(20).fill("showstubs verified authentic").join(" ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
