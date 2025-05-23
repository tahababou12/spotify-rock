import React from 'react'
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const playlists = [
    'My Playlist #1',
    'Chill Vibes',
    'Workout Mix',
    'Study Music',
    'Road Trip'
  ]

  const isActive = (page: string) => currentPage === page

  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold">S</span>
          </div>
          Spotify
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="mb-8">
        <ul className="space-y-4">
          <li>
            <button 
              onClick={() => onPageChange('home')}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isActive('home') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home size={24} />
              <span className="font-semibold">Home</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('search')}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isActive('search') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search size={24} />
              <span className="font-semibold">Search</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('library')}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isActive('library') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Library size={24} />
              <span className="font-semibold">Your Library</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Create Playlist */}
      <div className="mb-8">
        <ul className="space-y-4">
          <li>
            <button 
              onClick={() => onPageChange('create-playlist')}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isActive('create-playlist') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Plus size={24} />
              <span className="font-semibold">Create Playlist</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('liked-songs')}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isActive('liked-songs') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart size={24} />
              <span className="font-semibold">Liked Songs</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('downloaded')}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isActive('downloaded') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Download size={24} />
              <span className="font-semibold">Downloaded</span>
            </button>
          </li>
        </ul>
      </div>

      <hr className="border-gray-800 mb-4" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {playlists.map((playlist, index) => (
            <li key={index}>
              <button 
                onClick={() => onPageChange(`playlist-${playlist}`)}
                className={`block w-full text-left py-1 transition-colors ${
                  isActive(`playlist-${playlist}`) ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {playlist}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Install App */}
      <div className="mt-auto pt-4 border-t border-gray-800">
        <button className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-full text-left">
          <Download size={20} />
          <span className="text-sm font-semibold">Install App</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
