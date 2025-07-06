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
        className={`relative w-120 h-50 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-x-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front of ticket */}
        <div
          className={`absolute inset-0 ${selectedColor} border border-gray-300 p-6 flex text-black items-center backface-hidden`}
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

          <div className="">
            <div className="border-b border-black w-72">
              <div>{setlist.tour?.name}</div>
              <div className="font-bold">
                {setlist.artist.name.toUpperCase()}
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col border-r border-black p-2">
                <div>{dateComponents.month}</div>
                <div>{dateComponents.day}</div>
                <div>{dateComponents.year}</div>
              </div>
              <div className="flex-1 flex flex-col p-2">
                <div>{setlist.venue?.name}</div>
                <div>
                  {setlist.venue?.city?.name}, {setlist.venue?.city?.state}
                </div>
                <div>{setlist.venue?.city?.country?.name}</div>
              </div>
            </div>
          </div>
          <div className="transform rotate-270 origin-center text-center">
            <div>NO REFUNDS OR EXCHANGES</div>
            <div>{setlist.id.slice(-6)}</div>
          </div>
        </div>

        {/* Back of ticket */}
        <div
          className="absolute inset-0 overflow-hidden bg-gray-50 border border-gray-300 p-2 backface-hidden flex"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          <div className="w-12 flex flex-col justify-between">
            <div className="bg-black flex-1 w-8 ml-2"></div>
            <div>
              <div className="text-xl font-bold text-blue-800 transform -rotate-1 inline-block font-applause">
                SETLIST
              </div>
            </div>
            <div className="bg-black flex-1 w-8 ml-2"></div>
          </div>

          {/* Right side - Song grid */}
          <div className="flex-1 ml-4 font-applause text-blue-800 text-sm">
            {allSongs.length > 0 ? (
              <div className="grid grid-cols-3 gap-x-4 gap-y-1 h-full content-start overflow-hidden">
                <div className="space-y-1">
                  {allSongs.slice(0, 7).map((song, index) => (
                    <div
                      key={index}
                      className="leading-tight transform"
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
                        marginLeft: `${Math.random() * 3}px`,
                      }}
                    >
                      {index + 1}. {song}
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  {allSongs.slice(7, 15).map((song, index) => (
                    <div
                      key={index + 7}
                      className="leading-tight transform"
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
                        marginLeft: `${Math.random() * 3}px`,
                      }}
                    >
                      {index + 8}. {song}
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  {allSongs.slice(15, 21).map((song, index) => (
                    <div
                      key={index + 15}
                      className="  leading-tight transform"
                      style={{
                        transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
                        marginLeft: `${Math.random() * 3}px`,
                      }}
                    >
                      {index + 16}. {song}
                    </div>
                  ))}
                  {/* Show overflow indicator if more than 30 songs */}
                  {allSongs.length > 21 && (
                    <div className="text-xs text-gray-400 italic mt-2">
                      + {allSongs.length - 24} more songs...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500 italic transform rotate-1 mt-4">
                no setlist available
              </div>
            )}
          </div>

          {/* Background watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-3">
            <div className="text-xs text-black leading-tight max-w-full whitespace-pre-wrap text-center transform rotate-45">
              {Array(20).fill("showstubs verified authentic").join(" ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
