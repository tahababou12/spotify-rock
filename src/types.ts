export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  url: string
  cover: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  cover: string
  tracks: Track[]
}
