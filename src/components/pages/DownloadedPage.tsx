import React from 'react'
import { Download, Play, Pause, MoreHorizontal, Clock, Wifi, WifiOff } from 'lucide-react'
import { Track } from '../../types'

interface DownloadedPageProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
  currentTrack: Track | null
  isPlaying: boolean
}

const DownloadedPage: React.FC<DownloadedPageProps> = ({ 
  tracks, 
  onPlayTrack, 
  currentTrack, 
  isPlaying 
}) => {
  // Simulate some downloaded tracks (subset of all tracks)
  const downloadedTracks = tracks.slice(0, 3)

  return (
    <div className="flex-1 bg-gradient-to-b from-green-900 via-green-800 to-black overflow-y-auto">
      {/* Header */}
      <div className="p-8 pb-6">
        <div className="flex items-end gap-6">
          <div className="w-60 h-60 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-2xl flex items-center justify-center">
            <Download size={80} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-2">PLAYLIST</p>
            <h1 className="text-6xl font-bold text-white mb-4">Downloaded</h1>
            <p className="text-gray-300 mb-2">Your offline music collection</p>
            <p className="text-gray-400 text-sm">
              <span className="text-white font-semibold">You</span> • {downloadedTracks.length} songs
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-6">
        <div className="flex items-center gap-6">
          <button 
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors hover:scale-105"
            onClick={() => downloadedTracks.length > 0 && onPlayTrack(downloadedTracks[0])}
          >
            <Play size={24} className="text-black ml-1" fill="currentColor" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={32} />
          </button>
          <div className="flex items-center gap-2 text-green-400">
            <WifiOff size={20} />
            <span className="text-sm font-medium">Offline mode</span>
          </div>
        </div>
      </div>

      {/* Download Status */}
      <div className="px-8 mb-6">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download size={20} className="text-green-500" />
              <div>
                <p className="text-white font-medium">Download status</p>
                <p className="text-gray-400 text-sm">{downloadedTracks.length} songs downloaded</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">
                {(downloadedTracks.length * 3.2).toFixed(1)} MB
              </p>
              <p className="text-gray-400 text-sm">Storage used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        {downloadedTracks.length > 0 ? (
          <>
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm font-medium border-b border-gray-800 mb-4">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-2">DOWNLOAD DATE</div>
              <div className="col-span-1 flex justify-end">
                <Clock size={16} />
              </div>
            </div>

            {/* Tracks */}
            <div className="space-y-1">
              {downloadedTracks.map((track, index) => {
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
                      <Download size={14} className="text-green-500" />
                    </div>
                    <div className="col-span-3 flex items-center">
                      <p className="text-gray-400 text-sm hover:text-white hover:underline cursor-pointer">
                        {track.album}
                      </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <p className="text-gray-400 text-sm">
                        {Math.floor(Math.random() * 7) + 1} days ago
                      </p>
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
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
            <Download size={64} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No downloaded music</h3>
            <p className="text-gray-400 mb-6">Download songs to listen offline</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              Browse music
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DownloadedPage
