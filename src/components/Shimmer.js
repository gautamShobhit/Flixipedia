import { useEffect, useState, useRef } from "react";

// Typewriter logic unchanged, fully compatible with Tailwind
const GENRES = [
  "nostalgic",
  "thrilling",
  "mind-bending",
  "sci-fi",
  "feel-good",
  "Oscar-winning",
  "animated",
  "chilling horror",
  "romantic",
  "documentary",
  "action-packed",
  "indie",
  "classic",
  "fantasy",
  "cult favorite",
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
`;

const shimmerClass =
  "animate-[shimmer-breath_3s_ease-in-out_infinite] transition-colors duration-200";
const shimmerHoverClass = "hover:bg-gray-800";

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
      <h1 className="md:mt-10 mt-4 md:px-0 px-4 text-white text-center md:text-4xl text-sm font-bold">
        Start searching for{" "}
        <span
          aria-label={genreDisplay}
          className="align-middle font-bold text-[#f87171] tracking-tight drop-shadow genre-typewriter"
          // extra style for cursor blink & font
          style={{
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            borderRight: "0.15em solid white",
            minHeight: "1.25em",
            animation: "blink-cursor 0.8s step-end infinite alternate",
            verticalAlign: "middle",
            fontWeight: 700,
            fontFamily: `"Outfit", Arial, Helvetica, sans-serif`,
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
        movies and they'll show up here 📽️
      </h1>
      <div className="flex flex-wrap justify-center mt-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={[
              shimmerClass,
              "border-b border-white shadow-red-400 shadow-xl rounded-lg md:w-5/12 w-full mx-4 my-4 md:mx-8 md:h-80 h-48 bg-black bg-opacity-80",
              shimmerHoverClass,
            ].join(" ")}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
