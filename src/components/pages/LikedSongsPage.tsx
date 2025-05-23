import React from 'react'
import { Play, Pause, MoreHorizontal, Heart, Clock, Download, Shuffle } from 'lucide-react'
import { Track } from '../../types'

interface LikedSongsPageProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
  currentTrack: Track | null
  isPlaying: boolean
}

const LikedSongsPage: React.FC<LikedSongsPageProps> = ({ 
  tracks, 
  onPlayTrack, 
  currentTrack, 
  isPlaying 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-900 via-purple-800 to-black overflow-y-auto">
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-end gap-6">
          <div className="w-60 h-60 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
            <Heart size={80} className="text-white" fill="currentColor" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
            <h1 className="text-6xl font-bold text-white mb-4">Liked Songs</h1>
            <p className="text-gray-300 mb-2">Your favorite tracks all in one place</p>
            <p className="text-gray-400 text-sm">
              <span className="text-white font-semibold">You</span> • {tracks.length} songs
            </p>
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
            <Download size={32} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={32} />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
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
                  <button className="opacity-0 group-hover:opacity-100 text-green-500 hover:text-green-400 mr-4">
                    <Heart size={16} fill="currentColor" />
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

        {/* Empty State */}
        {tracks.length === 0 && (
          <div className="text-center py-16">
            <Heart size={64} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">Songs you like will appear here</h3>
            <p className="text-gray-400 mb-6">Save songs by tapping the heart icon.</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              Find something you like
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LikedSongsPage
