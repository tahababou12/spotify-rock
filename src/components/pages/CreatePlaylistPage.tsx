import React, { useState } from 'react'
import { Music, Upload, X, Check } from 'lucide-react'

const CreatePlaylistPage: React.FC = () => {
  const [playlistName, setPlaylistName] = useState('')
  const [description, setDescription] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      setIsCreated(true)
      setTimeout(() => {
        setIsCreated(false)
        setPlaylistName('')
        setDescription('')
      }, 2000)
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Create a new playlist</h1>
            <p className="text-gray-400 text-lg">
              Give your playlist a name and description to get started
            </p>
          </div>

          {/* Create Form */}
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="flex gap-8 mb-8">
              {/* Playlist Cover */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center group cursor-pointer hover:bg-gray-700 transition-colors">
                  <div className="text-center">
                    <Music size={48} className="text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Choose photo</p>
                  </div>
                </div>
              </div>

              {/* Playlist Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Playlist name *
                  </label>
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="My Playlist #1"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add an optional description"
                    rows={4}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="text-gray-400 text-sm">
                  <p>By proceeding, you agree to give Spotify access to the image you choose to upload.</p>
                  <p className="mt-1">Please make sure you have the right to upload the image.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button className="px-8 py-3 text-gray-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                disabled={!playlistName.trim()}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  playlistName.trim()
                    ? 'bg-green-500 text-black hover:bg-green-400'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCreated ? (
                  <div className="flex items-center gap-2">
                    <Check size={16} />
                    Created!
                  </div>
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-gray-900 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Tips for creating great playlists</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Give your playlist a descriptive name that reflects the mood or theme</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Add a cover image that represents your playlist's vibe</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Write a description to help others understand what your playlist is about</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Start with 10-15 songs and keep adding as you discover new music</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylistPage
