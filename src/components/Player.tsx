import React, { useRef, useEffect, useState } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  Heart,
  Maximize2
} from 'lucide-react'
import { Track } from '../types'

interface PlayerProps {
  currentTrack: Track | null
  isPlaying: boolean
  onTogglePlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  currentTime: number
  duration: number
  onTimeUpdate: (time: number) => void
  onDurationChange: (duration: number) => void
}

const Player: React.FC<PlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlayPause,
  onNext,
  onPrevious,
  currentTime,
  duration,
  onTimeUpdate,
  onDurationChange
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(0.7)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0) // 0: off, 1: all, 2: one

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      onDurationChange(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      onTimeUpdate(time)
    }
  }

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleEnded = () => {
    if (repeatMode === 2) {
      // Repeat one
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      onNext()
    }
  }

  if (!currentTrack) {
    return (
      <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center">
        <p className="text-gray-400">Select a song to start playing</p>
      </div>
    )
  }

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      {/* Current Track Info */}
      <div className="flex items-center gap-4 w-1/4">
        <img 
          src={currentTrack.cover} 
          alt={currentTrack.title}
          className="w-14 h-14 rounded"
        />
        <div className="min-w-0">
          <p className="text-white font-medium truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Heart size={16} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/2 max-w-2xl">
        <div className="flex items-center gap-4 mb-2">
          <button 
            className={`text-gray-400 hover:text-white transition-colors ${isShuffle ? 'text-green-500' : ''}`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <Shuffle size={16} />
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onPrevious}
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            onClick={onTogglePlayPause}
          >
            {isPlaying ? (
              <Pause size={16} className="text-black" fill="currentColor" />
            ) : (
              <Play size={16} className="text-black ml-0.5" fill="currentColor" />
            )}
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onNext}
          >
            <SkipForward size={20} />
          </button>
          <button 
            className={`text-gray-400 hover:text-white transition-colors ${repeatMode > 0 ? 'text-green-500' : ''}`}
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
          >
            <Repeat size={16} />
            {repeatMode === 2 && (
              <span className="absolute text-xs font-bold ml-3 -mt-2">1</span>
            )}
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-400 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume and Other Controls */}
      <div className="flex items-center gap-4 w-1/4 justify-end">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Maximize2 size={16} />
        </button>
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  )
}

export default Player
