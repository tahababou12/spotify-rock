import React, { useState } from 'react'
import { Search, Play, X } from 'lucide-react'
import { Track } from '../../types'

interface SearchPageProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
  currentTrack: Track | null
  isPlaying: boolean
}

const SearchPage: React.FC<SearchPageProps> = ({ tracks, onPlayTrack, currentTrack, isPlaying }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([])

  const browseCategories = [
    {
      id: '1',
      name: 'Podcasts',
      color: 'bg-green-500',
      cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Made For You',
      color: 'bg-blue-500',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Charts',
      color: 'bg-purple-500',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'New Releases',
      color: 'bg-red-500',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'
    },
    {
      id: '5',
      name: 'Discover',
      color: 'bg-orange-500',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
    },
    {
      id: '6',
      name: 'Hip-Hop',
      color: 'bg-yellow-500',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop'
    },
    {
      id: '7',
      name: 'Pop',
      color: 'bg-pink-500',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
      id: '8',
      name: 'Rock',
      color: 'bg-indigo-500',
      cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop'
    },
    {
      id: '9',
      name: 'Chill',
      color: 'bg-teal-500',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
    },
    {
      id: '10',
      name: 'Electronic',
      color: 'bg-cyan-500',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop'
    }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filtered = tracks.filter(track =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredTracks(filtered)
    } else {
      setFilteredTracks([])
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setFilteredTracks([])
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <div className="p-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white text-black pl-10 pr-10 py-3 rounded-full text-sm font-medium placeholder-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            {filteredTracks.length > 0 ? (
              <div className="space-y-2">
                {filteredTracks.map((track, index) => {
                  const isCurrentTrack = currentTrack?.id === track.id
                  return (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                      onClick={() => onPlayTrack(track)}
                    >
                      <div className="w-12 h-12 relative">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-full h-full rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Play size={16} className="text-white" fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
                          {track.title}
                        </p>
                        <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                      </div>
                      <div className="text-gray-400 text-sm">{track.duration}</div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
              </div>
            )}
          </div>
        )}

        {/* Browse All */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {browseCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.color} rounded-lg p-4 h-32 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
                >
                  <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                  <img
                    src={category.cover}
                    alt={category.name}
                    className="absolute -bottom-2 -right-2 w-20 h-20 rounded-lg transform rotate-12 shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
