import React, { useState, useEffect } from 'react';
import { Copy, Download, Eye, Code, Palette } from 'lucide-react';

const CodeVisualizer = () => {
    const [code, setCode] = useState(`// Welcome to React Code Visualizer
import React, { useState, useEffect } from 'react';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Effect hook for side effects
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div className="container">
      <h1>Counter App</h1>
      {isVisible && (
        <div className="counter-display">
          <p>Current count: {count}</p>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
        </div>
      )}
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Visibility
      </button>
    </div>
  );
};

export default ExampleComponent;`);

    const [theme, setTheme] = useState('dark');
    const [showLineNumbers, setShowLineNumbers] = useState(true);
    const [fontSize, setFontSize] = useState(14);
    const [highlightedLine, setHighlightedLine] = useState(null);

    // Syntax highlighting patterns
    const syntaxPatterns = {
        keyword: /\b(import|export|default|const|let|var|function|return|if|else|for|while|do|break|continue|switch|case|try|catch|finally|throw|class|extends|super|this|new|typeof|instanceof|true|false|null|undefined)\b/g,
        string: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
        comment: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        number: /\b\d+\.?\d*\b/g,
        operator: /[+\-*/%=<>!&|^~?:]/g,
        punctuation: /[{}[\]();,\.]/g,
        react: /\b(React|useState|useEffect|useCallback|useMemo|useRef|useContext|Component|Fragment|JSX)\b/g,
        jsxTag: /<\/?[A-Za-z][A-Za-z0-9]*(?:\s[^>]*)?\/?>/g,
        jsxAttribute: /\b[a-zA-Z-]+(?=\s*=)/g
    };

    const highlightSyntax = (code) => {
        let highlighted = code;

        // Apply syntax highlighting
        highlighted = highlighted.replace(syntaxPatterns.comment, '<span class="comment">$&</span>');
        highlighted = highlighted.replace(syntaxPatterns.string, '<span class="string">$&</span>');
        highlighted = highlighted.replace(syntaxPatterns.react, '<span class="react">$&</span>');
        highlighted = highlighted.replace(syntaxPatterns.keyword, '<span class="keyword">$&</span>');
        highlighted = highlighted.replace(syntaxPatterns.number, '<span class="number">$&</span>');
        highlighted = highlighted.replace(syntaxPatterns.jsxTag, '<span class="jsx-tag">$&</span>');
        highlighted = highlighted.replace(syntaxPatterns.jsxAttribute, '<span class="jsx-attribute">$&</span>');

        return highlighted;
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            alert('Code copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const downloadCode = () => {
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const lines = code.split('\n');

    const themes = {
        dark: {
            bg: 'bg-gray-900',
            text: 'text-gray-100',
            border: 'border-gray-700',
            lineNumber: 'text-gray-500',
            highlight: 'bg-gray-800'
        },
        light: {
            bg: 'bg-white',
            text: 'text-gray-900',
            border: 'border-gray-300',
            lineNumber: 'text-gray-400',
            highlight: 'bg-gray-100'
        },
        monokai: {
            bg: 'bg-gray-800',
            text: 'text-green-400',
            border: 'border-green-500',
            lineNumber: 'text-green-300',
            highlight: 'bg-gray-700'
        }
    };

    const currentTheme = themes[theme];

    return (
        <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-6`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Code className="w-8 h-8 text-blue-400" />
                        <h1 className="text-3xl font-bold">React Code Visualizer</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                        </button>
                        <button
                            onClick={downloadCode}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className={`${currentTheme.bg} ${currentTheme.border} border rounded-lg p-4 mb-6`}>
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center space-x-2">
                            <Palette className="w-4 h-4" />
                            <label className="text-sm font-medium">Theme:</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm"
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="monokai">Monokai</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Font Size:</label>
                            <input
                                type="range"
                                min="10"
                                max="20"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-20"
                            />
                            <span className="text-sm">{fontSize}px</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="lineNumbers"
                                checked={showLineNumbers}
                                onChange={(e) => setShowLineNumbers(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="lineNumbers" className="text-sm font-medium">
                                Show Line Numbers
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Code Editor */}
                    <div className={`${currentTheme.bg} ${currentTheme.border} border rounded-lg overflow-hidden`}>
                        <div className="flex items-center justify-between p-3 border-b border-gray-600">
                            <h2 className="text-lg font-semibold">Code Editor</h2>
                            <Eye className="w-5 h-5 text-gray-400" />
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className={`w-full h-96 p-4 ${currentTheme.bg} ${currentTheme.text} font-mono resize-none focus:outline-none`}
                            style={{ fontSize: `${fontSize}px` }}
                            placeholder="Enter your React code here..."
                        />
                    </div>

                    {/* Syntax Highlighted View */}
                    <div className={`${currentTheme.bg} ${currentTheme.border} border rounded-lg overflow-hidden`}>
                        <div className="flex items-center justify-between p-3 border-b border-gray-600">
                            <h2 className="text-lg font-semibold">Syntax Highlighted</h2>
                            <Code className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="relative">
              <pre className={`p-4 overflow-auto h-96 ${currentTheme.bg} font-mono`} style={{ fontSize: `${fontSize}px` }}>
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className={`flex ${highlightedLine === index ? currentTheme.highlight : ''} hover:${currentTheme.highlight} transition-colors cursor-pointer`}
                        onClick={() => setHighlightedLine(highlightedLine === index ? null : index)}
                    >
                        {showLineNumbers && (
                            <span className={`${currentTheme.lineNumber} select-none w-12 text-right pr-3 flex-shrink-0`}>
                        {index + 1}
                      </span>
                        )}
                        <code
                            className="flex-1"
                            dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || '<br>' }}
                        />
                    </div>
                ))}
              </pre>
                        </div>
                    </div>
                </div>

                {/* Code Statistics */}
                <div className={`${currentTheme.bg} ${currentTheme.border} border rounded-lg p-4 mt-6`}>
                    <h3 className="text-lg font-semibold mb-3">Code Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{lines.length}</div>
                            <div className="text-sm text-gray-400">Lines</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{code.length}</div>
                            <div className="text-sm text-gray-400">Characters</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {code.split(/\s+/).filter(word => word.length > 0).length}
                            </div>
                            <div className="text-sm text-gray-400">Words</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-400">
                                {(code.match(/function|const.*=.*=>|class/g) || []).length}
                            </div>
                            <div className="text-sm text-gray-400">Functions</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Syntax Highlighting Styles */}
            <style jsx>{`
        .keyword { color: #ff79c6; font-weight: bold; }
        .string { color: #f1fa8c; }
        .comment { color: #6272a4; font-style: italic; }
        .number { color: #bd93f9; }
        .react { color: #50fa7b; font-weight: bold; }
        .jsx-tag { color: #8be9fd; }
        .jsx-attribute { color: #ffb86c; }
      `}</style>
        </div>
    );
};

export default CodeVisualizer;