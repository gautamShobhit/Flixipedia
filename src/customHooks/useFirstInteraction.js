import { useState, useEffect } from "react";

const useFirstInteraction = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      // Remove event listeners once triggered so it only runs once
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return hasInteracted;
};

export default useFirstInteraction;
