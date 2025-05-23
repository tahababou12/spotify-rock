import React from 'react'
import { Play, Heart, Clock, MoreHorizontal } from 'lucide-react'
import { Track } from '../../types'

interface HomePageProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
  currentTrack: Track | null
  isPlaying: boolean
}

const HomePage: React.FC<HomePageProps> = ({ tracks, onPlayTrack, currentTrack, isPlaying }) => {
  const recentlyPlayed = tracks.slice(0, 6)
  const madeForYou = tracks.slice(2, 8)
  const popularPlaylists = [
    {
      id: '1',
      name: 'Today\'s Top Hits',
      description: 'The most played songs right now',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      tracks: 50
    },
    {
      id: '2', 
      name: 'RapCaviar',
      description: 'New music from Drake, Travis Scott and more',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
      tracks: 65
    },
    {
      id: '3',
      name: 'All Out 2010s',
      description: 'The biggest songs of the 2010s',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
      tracks: 100
    },
    {
      id: '4',
      name: 'Rock Classics',
      description: 'Rock legends & epic songs',
      cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
      tracks: 80
    },
    {
      id: '5',
      name: 'Chill Hits',
      description: 'Kick back to the best new and recent chill hits',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      tracks: 45
    },
    {
      id: '6',
      name: 'Peaceful Piano',
      description: 'Relax and indulge with beautiful piano pieces',
      cover: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop',
      tracks: 120
    }
  ]

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      {/* Header */}
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Good evening</h1>
        
        {/* Recently Played Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {recentlyPlayed.map((track) => (
            <div 
              key={track.id}
              className="bg-gray-800 rounded-lg flex items-center hover:bg-gray-700 transition-colors cursor-pointer group"
              onClick={() => onPlayTrack(track)}
            >
              <img 
                src={track.cover} 
                alt={track.title}
                className="w-20 h-20 rounded-l-lg"
              />
              <div className="flex-1 px-4">
                <p className="text-white font-semibold truncate">{track.title}</p>
                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
              </div>
              <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                  <Play size={16} className="text-black ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Made For You Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Made for you</h2>
            <button className="text-gray-400 hover:text-white text-sm font-semibold">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {madeForYou.map((track) => (
              <div 
                key={track.id}
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => onPlayTrack(track)}
              >
                <div className="relative mb-4">
                  <img 
                    src={track.cover} 
                    alt={track.title}
                    className="w-full aspect-square rounded-lg shadow-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-green-400">
                    <Play size={16} className="text-black ml-1" fill="currentColor" />
                  </button>
                </div>
                <h3 className="text-white font-semibold mb-2 truncate">{track.title}</h3>
                <p className="text-gray-400 text-sm truncate">By {track.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Playlists Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Popular playlists</h2>
            <button className="text-gray-400 hover:text-white text-sm font-semibold">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularPlaylists.map((playlist) => (
              <div 
                key={playlist.id}
                className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
              >
                <div className="relative mb-4">
                  <img 
                    src={playlist.cover} 
                    alt={playlist.name}
                    className="w-full aspect-square rounded-lg shadow-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-green-400">
                    <Play size={16} className="text-black ml-1" fill="currentColor" />
                  </button>
                </div>
                <h3 className="text-white font-semibold mb-2 truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{playlist.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
