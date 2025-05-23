import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface Track {
  title: string;
  src: string;
  image?: string;
}

const tracks: Track[] = [
  {
    title: "Lo-Fi Chill",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "https://i.imgur.com/8Km9tLL.jpg",
  },
  {
    title: "Evening Vibes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];

export default function LofiPlayer() {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-zinc-800 to-black text-white px-4 relative">
      {/* 배경 비디오 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-30"
      >
        <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
      </video>

      <h1 className="text-3xl font-bold mb-6 z-10">🎵 Lo-Fi Player</h1>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onEnded={() => {
          const nextTrack = (currentTrack + 1) % tracks.length;
          setCurrentTrack(nextTrack);
          setIsPlaying(true);
          setTimeout(() => audioRef.current?.play(), 100);
        }}
      />

      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-md text-center z-10">
        {tracks[currentTrack].image && (
          <img
            src={tracks[currentTrack].image}
            alt="album cover"
            className="w-48 h-48 object-cover rounded-xl mb-4 shadow mx-auto"
          />
        )}

        <h2 className="text-xl font-semibold mb-4">{tracks[currentTrack].title}</h2>

        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full text-white bg-zinc-700 hover:bg-zinc-600"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <div className="mt-4">
          <label className="text-sm text-zinc-400">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            onChange={handleVolumeChange}
            className="w-full mt-1"
          />
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => changeTrack(index)}
              className={`text-sm px-3 py-1 rounded-full ${
                currentTrack === index
                  ? "bg-white text-black"
                  : "bg-zinc-700 text-white"
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
