import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function AboutPage() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then((res) => res.text())
      .then(setMarkdown)
      .catch((err) => console.error("Fehler beim Laden der README:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 text-white">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-4 max-w-md rounded shadow-lg"
            />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline hover:text-cyan-200"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
