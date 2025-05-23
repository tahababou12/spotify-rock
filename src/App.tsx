import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import HomePage from './components/pages/HomePage'
import SearchPage from './components/pages/SearchPage'
import LibraryPage from './components/pages/LibraryPage'
import CreatePlaylistPage from './components/pages/CreatePlaylistPage'
import LikedSongsPage from './components/pages/LikedSongsPage'
import DownloadedPage from './components/pages/DownloadedPage'
import PlaylistPage from './components/pages/PlaylistPage'
import { Track } from './types'

const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Chill Abstract Intention',
    artist: 'Coma-Media',
    album: 'Free Music',
    duration: '2:30',
    url: 'https://www.soundjay.com/misc/sounds-1015.mp3',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Acoustic Breeze',
    artist: 'Benjamin Tissot',
    album: 'Bensound',
    duration: '2:44',
    url: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Creative Minds',
    artist: 'Benjamin Tissot',
    album: 'Bensound',
    duration: '2:30',
    url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Happy Rock',
    artist: 'Benjamin Tissot',
    album: 'Bensound',
    duration: '1:45',
    url: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Sunny',
    artist: 'Benjamin Tissot',
    album: 'Bensound',
    duration: '2:20',
    url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (!currentTrack) return
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % sampleTracks.length
    playTrack(sampleTracks[nextIndex])
  }

  const previousTrack = () => {
    if (!currentTrack) return
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? sampleTracks.length - 1 : currentIndex - 1
    playTrack(sampleTracks[prevIndex])
  }

  const renderCurrentPage = () => {
    const commonProps = {
      tracks: sampleTracks,
      onPlayTrack: playTrack,
      currentTrack,
      isPlaying
    }

    switch (currentPage) {
      case 'home':
        return <HomePage {...commonProps} />
      case 'search':
        return <SearchPage {...commonProps} />
      case 'library':
        return <LibraryPage {...commonProps} />
      case 'create-playlist':
        return <CreatePlaylistPage />
      case 'liked-songs':
        return <LikedSongsPage {...commonProps} />
      case 'downloaded':
        return <DownloadedPage {...commonProps} />
      default:
        if (currentPage.startsWith('playlist-')) {
          const playlistName = currentPage.replace('playlist-', '')
          return <PlaylistPage playlistName={playlistName} {...commonProps} />
        }
        return <HomePage {...commonProps} />
    }
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        {renderCurrentPage()}
      </div>
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlayPause={togglePlayPause}
        onNext={nextTrack}
        onPrevious={previousTrack}
        currentTime={currentTime}
        duration={duration}
        onTimeUpdate={setCurrentTime}
        onDurationChange={setDuration}
      />
    </div>
  )
}

export default App
