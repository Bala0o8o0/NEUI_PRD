import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

/**
 * A simple renderer to display formatted text without heavy dependencies.
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-green-900 font-mono">
        <p className="animate-pulse">{'>'} NO DATA FOUND</p>
      </div>
    );
  }

  // Styled specifically for the Retro Green Terminal Theme
  return (
    <div className="font-mono text-green-400">
      {content.split('\n').map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-2xl md:text-3xl font-bold mt-8 mb-6 text-green-400 border-b-2 border-green-500 pb-2 uppercase tracking-wide">
              {line.replace('# ', '')}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-xl font-bold mt-8 mb-4 text-green-300 border-l-4 border-green-600 pl-3 uppercase">
              {line.replace('## ', '')}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-lg font-bold mt-6 mb-3 text-green-500/80 uppercase tracking-wider">
              {'>'} {line.replace('### ', '')}
            </h3>
          );
        }

        // Lists
        if (line.trim().startsWith('- ')) {
          return (
            <li key={index} className="ml-4 list-none text-green-300/90 pl-2 my-1 relative before:content-['>'] before:absolute before:-left-4 before:text-green-700">
              {line.replace('- ', '')}
            </li>
          );
        }

        // Code blocks (Visual approximation)
        if (line.startsWith('```')) {
          return <div key={index} className="h-px bg-green-900 my-2"></div>;
        }

        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-4"></div>;
        }

        // Paragraphs
        return <p key={index} className="text-green-300 leading-relaxed my-2">{line}</p>;
      })}
    </div>
  );
};

export default MarkdownRenderer;