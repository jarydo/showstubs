export interface Setlists {
  setlist: Array<Setlist>;
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface Setlist {
  id: string;
  versionId: string;
  eventDate: string;
  lastUpdated: string;
  artist: Artist;
  venue: Venue;
  tour?: {
    name: string;
  };
  sets: {
    set: Array<{
      name?: string;
      encore?: number;
      song: Array<{
        name: string;
        with?: {
          mbid: string;
          name: string;
          sortName: string;
          disambiguation: string;
          url: string;
        };
        cover?: {
          mbid: string;
          name: string;
          sortName: string;
          disambiguation: string;
          url: string;
        };
        info?: string;
        tape?: boolean;
      }>;
    }>;
  };
  info?: string;
  url: string;
}

export interface Artist {
  mbid: string;
  name: string;
  sortName: string;
  disambiguation: string;
  url: string;
}

export interface Venue {
  id: string;
  name: string;
  city: City;
  url: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  coords: {
    lat: number;
    long: number;
  };
  country: {
    code: string;
    name: string;
  };
}
