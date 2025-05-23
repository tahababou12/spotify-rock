import React, { useState } from 'react'
import { Search, Grid3X3, List, Plus, ArrowRight, Play, Clock, Heart } from 'lucide-react'
import { Track } from '../../types'

interface LibraryPageProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
  currentTrack: Track | null
  isPlaying: boolean
}

const LibraryPage: React.FC<LibraryPageProps> = ({ tracks, onPlayTrack, currentTrack, isPlaying }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [filter, setFilter] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all')

  const playlists = [
    {
      id: '1',
      name: 'Liked Songs',
      type: 'playlist',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      trackCount: tracks.length,
      creator: 'You',
      pinned: true
    },
    {
      id: '2',
      name: 'My Playlist #1',
      type: 'playlist',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      trackCount: 23,
      creator: 'You',
      pinned: false
    },
    {
      id: '3',
      name: 'Chill Vibes',
      type: 'playlist',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      trackCount: 45,
      creator: 'You',
      pinned: false
    },
    {
      id: '4',
      name: 'Workout Mix',
      type: 'playlist',
      cover: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
      trackCount: 32,
      creator: 'You',
      pinned: false
    },
    {
      id: '5',
      name: 'Study Music',
      type: 'playlist',
      cover: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop',
      trackCount: 67,
      creator: 'You',
      pinned: false
    },
    {
      id: '6',
      name: 'Road Trip',
      type: 'playlist',
      cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
      trackCount: 28,
      creator: 'You',
      pinned: false
    }
  ]

  const artists = [
    {
      id: '1',
      name: 'Benjamin Tissot',
      type: 'artist',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      trackCount: 4
    },
    {
      id: '2',
      name: 'Coma-Media',
      type: 'artist',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      trackCount: 1
    }
  ]

  const albums = [
    {
      id: '1',
      name: 'Bensound',
      type: 'album',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      trackCount: 4,
      artist: 'Benjamin Tissot'
    },
    {
      id: '2',
      name: 'Free Music',
      type: 'album',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      trackCount: 1,
      artist: 'Coma-Media'
    }
  ]

  const getFilteredItems = () => {
    switch (filter) {
      case 'playlists':
        return playlists
      case 'artists':
        return artists
      case 'albums':
        return albums
      default:
        return [...playlists, ...artists, ...albums]
    }
  }

  const filteredItems = getFilteredItems()

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-white">Your Library</h1>
            <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
              <Plus size={24} />
            </button>
            <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="w-8 h-8 text-gray-400 hover:text-white transition-colors"
            >
              {viewMode === 'list' ? <Grid3X3 size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'all', label: 'All' },
            { key: 'playlists', label: 'Playlists' },
            { key: 'artists', label: 'Artists' },
            { key: 'albums', label: 'Albums' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recently Played */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Recently played</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {tracks.slice(0, 5).map((track) => (
              <div
                key={track.id}
                className="flex-shrink-0 w-48 bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => onPlayTrack(track)}
              >
                <div className="relative mb-4">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full aspect-square rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <Play size={14} className="text-black ml-0.5" fill="currentColor" />
                  </button>
                </div>
                <h3 className="text-white font-medium text-sm truncate mb-1">{track.title}</h3>
                <p className="text-gray-400 text-xs truncate">{track.artist}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Library Items */}
        <div>
          {viewMode === 'list' ? (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                >
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{item.name}</p>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      {item.type === 'playlist' && (
                        <>
                          <span>Playlist</span>
                          <span>•</span>
                          <span>{(item as any).creator}</span>
                        </>
                      )}
                      {item.type === 'artist' && <span>Artist</span>}
                      {item.type === 'album' && (
                        <>
                          <span>Album</span>
                          <span>•</span>
                          <span>{(item as any).artist}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                      <Play size={14} className="text-black ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                >
                  <div className="relative mb-4">
                    <img
                      src={item.cover}
                      alt={item.name}
                      className="w-full aspect-square rounded-lg"
                    />
                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <Play size={16} className="text-black ml-1" fill="currentColor" />
                    </button>
                  </div>
                  <h3 className="text-white font-semibold mb-2 truncate">{item.name}</h3>
                  <div className="text-gray-400 text-sm">
                    {item.type === 'playlist' && (
                      <p>Playlist • {(item as any).creator}</p>
                    )}
                    {item.type === 'artist' && <p>Artist</p>}
                    {item.type === 'album' && (
                      <p>Album • {(item as any).artist}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LibraryPage
