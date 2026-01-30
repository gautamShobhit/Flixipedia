import { useEffect, useState, useRef } from "react";

// Typewriter logic unchanged, fully compatible with Tailwind
const GENRES = [
  "nostalgic movies",
  "thrilling movies",
  "mind-bending movies",
  "sci-fi movies",
  "feel-good movies",
  "Oscar-winning movies",
  "animated movies",
  "chilling horror movies",
  "romantic movies",
  "documentary movies",
  "action-packed movies",
  "indie movies",
  "classic movies",
  "fantasy movies",
  "cult favorite movies",
];

function useTypewriter(
  words,
  { typingSpeed = 90, backspaceSpeed = 40, pause = 1300 } = {},
) {
  const [display, setDisplay] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [isBackspacing, setIsBackspacing] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const currentWord = words[loopIndex];
    if (!isBackspacing) {
      if (charIndex <= currentWord.length) {
        setDisplay(currentWord.substring(0, charIndex));
        timeoutRef.current = setTimeout(
          () => setCharIndex((c) => c + 1),
          typingSpeed,
        );
      } else {
        timeoutRef.current = setTimeout(() => setIsBackspacing(true), pause);
      }
    } else {
      if (charIndex > 0) {
        setDisplay(currentWord.substring(0, charIndex - 1));
        timeoutRef.current = setTimeout(
          () => setCharIndex((c) => c - 1),
          backspaceSpeed,
        );
      } else {
        setIsBackspacing(false);
        setLoopIndex((i) => (i + 1) % words.length);
        timeoutRef.current = setTimeout(() => setCharIndex(1), 100);
      }
    }
    // eslint-disable-next-line
  }, [
    charIndex,
    isBackspacing,
    loopIndex,
    words,
    typingSpeed,
    backspaceSpeed,
    pause,
  ]);

  return display;
}

// Tailwind utility classes + CSS-in-JS for animation
const shimmerKeyframes = `
  @keyframes shimmer-breath {
    0% { box-shadow: 0 0 15px 2px #f87171, 0 0 20px 0 transparent; }
    50% { box-shadow: 0 0 35px 9px #ef4444, 0 0 60px 15px #a21caf33; }
    100% { box-shadow: 0 0 15px 2px #f87171, 0 0 20px 0 transparent; }
  }
  @keyframes blink-cursor {
    0%, 100% { border-color: transparent; }
    40% { border-color: #fff;}
  }
  /* Add wavy loader animation for shimmer bars */
  @keyframes shimmer-wave {
    0% { transform: translateY(0px); }
    10% { transform: translateY(-2px); }
    20% { transform: translateY(-5px);}
    30% { transform: translateY(-2px);}
    40% { transform: translateY(0px);}
    50% { transform: translateY(2px);}
    60% { transform: translateY(3px);}
    70% { transform: translateY(1px);}
    80% { transform: translateY(0px);}
    90% { transform: translateY(-1px);}
    100% { transform: translateY(0px);}
  }
  .wavy-shimmer-bar {
    animation: shimmer-wave 1.4s ease-in-out infinite;
    will-change: transform;
  }
`;

// Skeleton shimmer effect for a breathing, MovieTile-shaped placeholder
const shimmerClass =
  "animate-[shimmer-breath_3s_ease-in-out_infinite] bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800";

const shimmerHoverClass = "hover:bg-gray-800";

// Bar component without wavy animation (we remove the wavy-shimmer-bar class)
const WavyShimmerBar = ({ className = "", style = {}, ...props }) => (
  <div className={`${className} shimmer-bar`} style={style} {...props} />
);

// Corrected MovieTile shimmer: renders the shimmer bars/content inside the shimmer card
const ShimmerMovieTile = () => (
  <div
    className={`group flex text-gray-300 border-b border-white shadow-lg shadow-red-400 rounded-lg md:w-5/12 w-full mx-4 my-4 md:mx-8 md:h-80 h-48 ${shimmerClass} ${shimmerHoverClass} bg-black bg-opacity-80`}
    style={{
      background: "linear-gradient(120deg, #23272f 80%, #222c39 100%)",
    }}
  >
    {/* Poster Skeleton */}
    <div className="w-2/6 flex justify-center p-2 relative">
      <WavyShimmerBar
        className="w-full h-full rounded-lg"
        style={{
          background: "linear-gradient(135deg, #35383c 85%, #1a2532 100%)",
          opacity: 0.6,
        }}
      />
    </div>
    {/* Info Skeleton */}
    <div
      className="w-4/6 border border-gray-400 m-2 ml-0 rounded-lg overflow-y-scroll scrollbar-hide flex flex-col"
      style={{
        background: "linear-gradient(135deg, #232b36 85%, #1a2332 100%)",
        opacity: 0.95,
      }}
    >
      {/* Title bar */}
      <WavyShimmerBar
        className="h-6 mt-4 mx-2 rounded"
        style={{
          width: "60%",
          background: "linear-gradient(90deg, #3c4252 60%, #232b36 100%)",
        }}
      />
      {/* Date bar */}
      <WavyShimmerBar
        className="h-4 mt-3 mx-6 rounded"
        style={{
          width: "40%",
          background: "linear-gradient(90deg, #525865 80%, #232b36 100%)",
        }}
      />
      {/* Plot bar (multi-line) */}
      <div className="flex flex-col gap-2 mt-5 mx-4">
        <WavyShimmerBar
          className="h-3 rounded"
          style={{
            width: "95%",
            background: "linear-gradient(90deg, #484e5b 60%, #242c37 100%)",
          }}
        />
        <WavyShimmerBar
          className="h-3 rounded"
          style={{
            width: "90%",
            background: "linear-gradient(90deg, #484e5b 60%, #232b36 100%)",
          }}
        />
        <WavyShimmerBar
          className="h-3 rounded"
          style={{
            width: "60%",
            background: "linear-gradient(90deg, #484e5b 60%, #222930 100%)",
          }}
        />
      </div>
      {/* Rating bar */}
      <WavyShimmerBar
        className="h-4 mt-5 mx-6 rounded"
        style={{
          width: "36%",
          background: "linear-gradient(90deg, #525865 80%, #222930 100%)",
        }}
      />
      {/* Collapsible Reason Skeleton */}
      <div
        className="border border-gray-400 mt-6 mx-6 rounded-lg p-2 flex flex-col"
        style={{
          background: "linear-gradient(120deg, #232b36 80%, #20243c 100%)",
          opacity: 0.93,
        }}
      >
        <WavyShimmerBar
          className="h-4 rounded mb-2"
          style={{
            width: "70%",
            background: "linear-gradient(90deg, #393e4d 70%, #232b36 100%)",
          }}
        />
        <WavyShimmerBar
          className="h-3 rounded mb-1"
          style={{
            width: "90%",
            background: "linear-gradient(90deg, #222930 80%, #181c22 100%)",
          }}
        />
        <WavyShimmerBar
          className="h-3 rounded mb-1"
          style={{
            width: "75%",
            background: "linear-gradient(90deg, #232b36 85%, #181c22 100%)",
          }}
        />
      </div>
    </div>
  </div>
);

// Use Tailwind for typewriter/cursor effect, fallback to injected style for animation
function Shimmer() {
  const genreDisplay = useTypewriter(GENRES);

  // We inject the keyframes needed for animation
  useEffect(() => {
    if (document.getElementById("shimmer-animations")) return;
    const style = document.createElement("style");
    style.id = "shimmer-animations";
    style.innerHTML = shimmerKeyframes;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <h1 className=" md:mt-10 mt-4 md:px-0 px-4 text-white text-center md:text-4xl text-sm font-bold">
        Can't think of a prompt yet ? Try{" "}
        <span
          aria-label={genreDisplay}
          className="align-middle font-bold text-[#71b5f8] tracking-tight drop-shadow genre-typewriter"
          // extra style for cursor blink & font
          style={{
            paddingBottom: "2px",
            display: "inline-block",
            paddingRight: "4px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            borderRight: "0.14em solid white",
            minHeight: "1.25em",
            animation: "blink-cursor 0.8s step-end infinite alternate",
            verticalAlign: "middle",
            fontWeight: 700,
            fontFamily: `"Kaushan Script", cursive`,
            fontVariantLigatures: "none",
            position: "relative",
            top: 0,
            letterSpacing: "0.01em",
            textShadow: "0 2px 10px #ef444480",
            fontSize: "inherit",
          }}
        >
          {genreDisplay}
        </span>{" "}
      </h1>
      <div className="flex flex-wrap justify-center mt-6">
        {[...Array(4)].map((_, i) => (
          <ShimmerMovieTile key={i} />
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
