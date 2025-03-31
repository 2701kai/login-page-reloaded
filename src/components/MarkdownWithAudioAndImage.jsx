import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownWithAudioAndImage() {
  const [markdown, setMarkdown] = useState("");
  const [showImage, setShowImage] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("/credits/README_credits.md")
      .then((res) => res.text())
      .then(setMarkdown)
      .catch((err) => console.error("Fehler beim Laden der README:", err));
  }, []);

  const handleLinkClick = (href) => (e) => {
    if (href.includes("404.png")) {
      e.preventDefault();
      setShowImage(true);
      audioRef.current?.play().catch(console.warn);
    }
  };

  return (
    <div className="p-4 text-white">
      <audio
        ref={audioRef}
        src="/credits/hal9000CantDoLong.mp3"
        preload="auto"
      />

      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              onClick={handleLinkClick(href)}
              className="text-cyan-400 underline hover:text-cyan-200 cursor-pointer"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>

      {showImage && (
        <div className="flex justify-center mt-4">
          <img
            src="/credits/404.png"
            alt="Vielleicht frag ich erstmal.."
            className="max-w-sm rounded-lg shadow-lg animate-fade-in"
          />
        </div>
      )}
    </div>
  );
}
