/* eslint-disable no-unused-vars */
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import reactGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

const AiResponsePreviewer = ({ content }) => {
  if (!content) return null;

  const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);
    const copyCode = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 bg-white/[0.03] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <LuCode className="text-orange-500" size={14} />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              {language || "Code"}
            </span>
          </div>
          <button onClick={copyCode} className="text-gray-500 hover:text-white transition-all p-1.5 hover:bg-white/5 rounded-lg">
            {copied ? <LuCheck size={16} className="text-green-500" /> : <LuCopy size={16} />}
          </button>
        </div>
        <SyntaxHighlighter
          language={language || "javascript"}
          style={vscDarkPlus}
          customStyle={{ fontSize: "13px", lineHeight: "1.6", margin: 0, padding: "1.5rem", background: "transparent" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto selection:bg-orange-500/30">
     
      <div className="prose prose-invert max-w-none 
                    prose-p:text-[#e0e0e0] prose-p:opacity-100
                    prose-li:text-[#d1d1d1] prose-li:opacity-100
                    prose-strong:text-white prose-strong:font-bold">
        <ReactMarkdown
          remarkPlugins={[reactGfm]}
          components={{
            p: ({ children }) => <p className="text-[#e5e7eb] text-[15px] leading-relaxed mb-6 block !opacity-100">{children}</p>,
            strong: ({ children }) => <strong className="text-white font-black">{children}</strong>,
            ul: ({ children }) => <ul className="list-disc pl-6 space-y-3 mb-6 marker:text-orange-500">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-3 mb-6 marker:text-orange-500">{children}</ol>,
            li: ({ children }) => <li className="text-[#d1d5db]">{children}</li>,
            h1: ({ children }) => <h1 className="text-3xl font-black text-white mt-10 mb-5 tracking-tighter">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 tracking-tight border-b border-white/5 pb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold text-orange-500 mt-6 mb-3">{children}</h3>,
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !className ? (
                <code className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-orange-400 font-mono text-[13px] font-bold" {...props}>
                  {children}
                </code>
              ) : (
                <CodeBlock code={String(children).replace(/\n$/, "")} language={match ? match[1] : ""} />
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AiResponsePreviewer;