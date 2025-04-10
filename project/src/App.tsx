import React, { useState } from 'react';
import { Sun, Moon, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ isFake: boolean; confidence: number } | null>(null);

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult({
      isFake: Math.random() > 0.5,
      confidence: Math.random() * 100
    });
    setIsAnalyzing(false);
  };

  const restartAnalysis = () => {
    setText('');
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Fake Detection AI</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Main Content */}
        <div className={`rounded-lg p-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-xl`}>
          {/* Text Input Section */}
          <div className="mb-8">
            <label 
              htmlFor="analysis-text" 
              className="block text-lg font-medium mb-2"
            >
              Enter text to analyze
            </label>
            <textarea
              id="analysis-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to analyze..."
              className={`w-full h-32 p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          {/* Analysis Button */}
          {text && !isAnalyzing && !result && (
            <button
              onClick={analyzeText}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze Text
            </button>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="text-center">
              <Loader2 className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-lg">Analyzing your text...</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className={`mt-8 p-6 rounded-lg ${
              result.isFake
                ? (isDarkMode ? 'bg-red-900/50' : 'bg-red-50')
                : (isDarkMode ? 'bg-green-900/50' : 'bg-green-50')
            }`}>
              <div className="flex items-center gap-4">
                {result.isFake ? (
                  <AlertTriangle className="text-red-500" size={32} />
                ) : (
                  <CheckCircle className="text-green-500" size={32} />
                )}
                <div>
                  <h3 className="text-xl font-semibold">
                    {result.isFake ? 'Likely Fake' : 'Likely Authentic'}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Confidence: {result.confidence.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Restart Button */}
          {result && (
            <div className="mt-4 text-center">
              <button
                onClick={restartAnalysis}
                className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Restart Analysis
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className={`mt-8 text-center ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>© 2025 Fake Detection AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;