import { useEffect, useState } from "react";

const TypingText = ({
  text,
  speed = 50,        // ms per character
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(async () => {
      await setDisplayedText(prev => prev + text[index]);
      index++;

      if (index === text.length-1) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayedText}</span>;
};

export default TypingText;
