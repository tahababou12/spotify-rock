import React from 'react'
import { Play, Pause, MoreHorizontal, Heart, Clock, Shuffle, Download } from 'lucide-react'
import { Track } from '../../types'

interface PlaylistPageProps {
  playlistName: string
  tracks: Track[]
  onPlayTrack: (track: Track) => void
  currentTrack: Track | null
  isPlaying: boolean
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ 
  playlistName,
  tracks, 
  onPlayTrack, 
  currentTrack, 
  isPlaying 
}) => {
  // Generate random playlist data
  const playlistData = {
    name: playlistName,
    description: `Your personal ${playlistName.toLowerCase()} collection`,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    creator: 'You',
    followers: Math.floor(Math.random() * 1000) + 50,
    totalDuration: tracks.reduce((total, track) => {
      const [minutes, seconds] = track.duration.split(':').map(Number)
      return total + minutes * 60 + seconds
    }, 0)
  }

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours} hr ${minutes} min`
    }
    return `${minutes} min`
  }

  const getRandomColor = () => {
    const colors = [
      'from-purple-900 via-purple-800',
      'from-blue-900 via-blue-800', 
      'from-green-900 via-green-800',
      'from-red-900 via-red-800',
      'from-orange-900 via-orange-800',
      'from-pink-900 via-pink-800'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className={`flex-1 bg-gradient-to-b ${getRandomColor()} to-black overflow-y-auto`}>
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-end gap-6">
          <div className="w-60 h-60 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-2xl">
            <img 
              src={playlistData.cover} 
              alt={playlistData.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
            <h1 className="text-6xl font-bold text-white mb-4">{playlistData.name}</h1>
            <p className="text-gray-300 mb-2">{playlistData.description}</p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span className="text-white font-semibold">{playlistData.creator}</span>
              <span>•</span>
              <span>{playlistData.followers} likes</span>
              <span>•</span>
              <span>{tracks.length} songs,</span>
              <span className="text-gray-500">
                {formatTotalDuration(playlistData.totalDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-6">
        <div className="flex items-center gap-6">
          <button 
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors hover:scale-105"
            onClick={() => tracks.length > 0 && onPlayTrack(tracks[0])}
          >
            <Play size={24} className="text-black ml-1" fill="currentColor" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle size={32} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart size={32} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Download size={32} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={32} />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        {tracks.length > 0 ? (
          <>
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm font-medium border-b border-gray-800 mb-4">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2">DATE ADDED</div>
              <div className="col-span-1 flex justify-end">
                <Clock size={16} />
              </div>
            </div>

            {/* Tracks */}
            <div className="space-y-1">
              {tracks.map((track, index) => {
                const isCurrentTrack = currentTrack?.id === track.id
                return (
                  <div 
                    key={track.id}
                    className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-md hover:bg-gray-800 transition-colors group cursor-pointer ${
                      isCurrentTrack ? 'bg-gray-800' : ''
                    }`}
                    onClick={() => onPlayTrack(track)}
                  >
                    <div className="col-span-1 flex items-center">
                      <span className="text-gray-400 group-hover:hidden">
                        {isCurrentTrack && isPlaying ? (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="flex gap-1">
                              <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                              <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        ) : (
                          index + 1
                        )}
                      </span>
                      <button className="hidden group-hover:block text-white">
                        {isCurrentTrack && isPlaying ? (
                          <Pause size={16} fill="currentColor" />
                        ) : (
                          <Play size={16} fill="currentColor" />
                        )}
                      </button>
                    </div>
                    <div className="col-span-5 flex items-center gap-3">
                      <img 
                        src={track.cover} 
                        alt={track.title}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <p className={`font-medium ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
                          {track.title}
                        </p>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-gray-400 text-sm hover:text-white hover:underline cursor-pointer">
                        {track.album}
                      </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <p className="text-gray-400 text-sm">
                        {Math.floor(Math.random() * 30) + 1} days ago
                      </p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white mr-4">
                        <Heart size={16} />
                      </button>
                      <p className="text-gray-400 text-sm">{track.duration}</p>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white ml-4">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Play size={24} className="text-gray-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">This playlist is empty</h3>
            <p className="text-gray-400 mb-6">Add some songs to get started</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              Find something to add
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaylistPage
