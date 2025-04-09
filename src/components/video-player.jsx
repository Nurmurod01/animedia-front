"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Loader } from "lucide-react"
import { cn } from "@/lib/utils"

export default function VideoPlayer({
  src,
  title,
  poster,
  className,
  autoPlay = false,
  controls = true,
  muted = false,
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  // Detect video source type
  const getVideoType = (url) => {
    if (!url) return "unknown"

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube"
    } else if (url.includes("vimeo.com")) {
      return "vimeo"
    } else if (url.endsWith(".mp4")) {
      return "mp4"
    } else if (url.endsWith(".webm")) {
      return "webm"
    } else if (url.endsWith(".ogg") || url.endsWith(".ogv")) {
      return "ogg"
    }

    return "unknown"
  }

  // Format embed URL for external video platforms
  const getEmbedUrl = (url) => {
    if (!url) return null

    const videoType = getVideoType(url)

    if (videoType === "youtube") {
      const videoId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop()

      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}`
    }

    if (videoType === "vimeo") {
      const videoId = url.split("/").pop()
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}`
    }

    return url
  }

  const videoType = getVideoType(src)
  const embedUrl = getEmbedUrl(src)
  const isExternalVideo = videoType === "youtube" || videoType === "vimeo"

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  // Handle mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    if (!videoRef.current) return

    videoRef.current.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
      videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      videoRef.current.muted = false
    }
  }

  // Handle seeking
  const handleSeek = (e) => {
    if (!videoRef.current) return

    const seekTime = Number.parseFloat(e.target.value)
    videoRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Skip forward/backward
  const skip = (seconds) => {
    if (!videoRef.current) return

    videoRef.current.currentTime += seconds
  }

  // Show/hide controls on mouse movement
  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  // Event listeners for HTML5 video
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || isExternalVideo) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onVolumeChange = () => {
      setVolume(videoElement.volume)
      setIsMuted(videoElement.muted)
    }
    const onTimeUpdate = () => setCurrentTime(videoElement.currentTime)
    const onLoadedMetadata = () => {
      setDuration(videoElement.duration)
      setIsLoading(false)
    }
    const onLoadedData = () => setIsLoading(false)
    const onError = () => {
      setError("Error loading video")
      setIsLoading(false)
    }
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    videoElement.addEventListener("play", onPlay)
    videoElement.addEventListener("pause", onPause)
    videoElement.addEventListener("volumechange", onVolumeChange)
    videoElement.addEventListener("timeupdate", onTimeUpdate)
    videoElement.addEventListener("loadedmetadata", onLoadedMetadata)
    videoElement.addEventListener("loadeddata", onLoadedData)
    videoElement.addEventListener("error", onError)
    document.addEventListener("fullscreenchange", onFullscreenChange)

    return () => {
      videoElement.removeEventListener("play", onPlay)
      videoElement.removeEventListener("pause", onPause)
      videoElement.removeEventListener("volumechange", onVolumeChange)
      videoElement.removeEventListener("timeupdate", onTimeUpdate)
      videoElement.removeEventListener("loadedmetadata", onLoadedMetadata)
      videoElement.removeEventListener("loadeddata", onLoadedData)
      videoElement.removeEventListener("error", onError)
      document.removeEventListener("fullscreenchange", onFullscreenChange)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isExternalVideo])

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    } else {
      setShowControls(true)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-black rounded-lg", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isExternalVideo ? (
        // External video (YouTube, Vimeo)
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={title || "Video player"}
          ></iframe>
        </div>
      ) : (
        // HTML5 video
        <>
          <video
            ref={videoRef}
            className="w-full h-full"
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            playsInline
            onClick={togglePlay}
          >
            <source src={src} type={`video/${videoType}`} />
            Your browser does not support the video tag.
          </video>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader className="h-12 w-12 animate-spin text-[#8a2be2]" />
            </div>
          )}

          {/* Error overlay */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center p-4">
                <p className="text-red-500 mb-2">{error}</p>
                <button
                  className="px-4 py-2 bg-[#8a2be2] text-white rounded-md"
                  onClick={() => {
                    setError(null)
                    setIsLoading(true)
                    if (videoRef.current) {
                      videoRef.current.load()
                    }
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Custom controls */}
          {controls && !error && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Progress bar */}
              <div className="flex items-center mb-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff5d8f]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* Play/Pause button */}
                  <button
                    onClick={togglePlay}
                    className="p-1 rounded-full hover:bg-white/20"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>

                  {/* Skip buttons */}
                  <button
                    onClick={() => skip(-10)}
                    className="p-1 rounded-full hover:bg-white/20"
                    aria-label="Skip back 10 seconds"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => skip(10)}
                    className="p-1 rounded-full hover:bg-white/20"
                    aria-label="Skip forward 10 seconds"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>

                  {/* Volume control */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={toggleMute}
                      className="p-1 rounded-full hover:bg-white/20"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff5d8f]"
                    />
                  </div>

                  {/* Time display */}
                  <div className="text-xs text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Fullscreen button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1 rounded-full hover:bg-white/20"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

