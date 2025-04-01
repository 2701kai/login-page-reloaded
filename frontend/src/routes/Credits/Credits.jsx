import { useRef, useEffect, useState } from "react";
import { Children } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

export default function CreditsPage() {
  const [markdown, setMarkdown] = useState("");
  const [showImage, setShowImage] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("/credits/README_credits.md")
      .then((res) => res.text())
      .then(setMarkdown)
      .catch((err) => console.error("Fehler beim Laden der README:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 text-white">
      <div className="p-4 text-white">
        {/* AUDIO ELEMENT */}
        <audio
          ref={audioRef}
          src="/credits/hal9000CantDoLong.mp3"
          preload="auto"
        />

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            // A: LINK-HANDLING
            a: ({ href, children }) => {
              const flatText = Children.toArray(children)
                .map((child) =>
                  typeof child === "string"
                    ? child
                    : typeof child?.props?.children === "string"
                    ? child.props.children
                    : ""
                )
                .join("");

              const isMarkus = flatText.trim().toLowerCase() === "markus";
              const isHal = href.endsWith(".mp3");
              const isImageLink = href.includes("404");

              const handleClick = (e) => {
                if (isMarkus || isHal || isImageLink) {
                  e.preventDefault();
                  setShowImage(true);
                  audioRef.current?.play().catch(console.warn);
                }
              };

              return (
                <a
                  href={href}
                  onClick={handleClick}
                  className={
                    isMarkus
                      ? "btn-kai "
                      : "text-cyan-400 underline hover:text-cyan-200 cursor-pointer"
                  }
                >
                  {children}
                </a>
              );
            },

            // B: SPAN-HANDLING (für typewriter-Effekt)
            span: ({ node, children }) => {
              const isTypewriter =
                node?.properties?.className?.includes("typewriter");
              return (
                <span className={isTypewriter ? "typewriter" : ""}>
                  {children}
                </span>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>

        {/* C: IMAGE anzeigen bei Klick */}
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
    </div>
  );
}
