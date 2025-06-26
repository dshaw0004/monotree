import React, {useState, useEffect} from 'react';
import {Home, Search, ArrowLeft, Smartphone, Zap, Star, Download} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const suggestedApps = [
    {name: 'Track My Attendance', category: 'Productivity', rating: 4.8, downloads: '2', icon: '📸', color: 'from-purple-500 to-pink-500'},
    {name: 'Dictionary', category: 'Education', rating: 4.9, downloads: '1', icon: '✅', color: 'from-blue-500 to-cyan-500'},
    {name: 'Dev Community', category: 'News', rating: 4.9, downloads: '1', icon: '💻', color: 'from-orange-500 to-red-500'},
    {name: 'AAi1', category: 'AI', rating: 4.6, downloads: '1', icon: '🎵', color: 'from-indigo-500 to-purple-500'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      {/* 404 Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          </div>

          {/* Main 404 Content */}
          <div className="relative z-10">
            {/* Glitch Effect 404 */}
            <div className="mb-8 relative">
              <h1 className={`text-8xl sm:text-9xl lg:text-[12rem] font-black text-white mb-4 leading-none select-none ${glitchActive ? 'animate-pulse' : ''}`}>
                4
                <span className={`inline-block ${glitchActive ? 'text-red-500 transform skew-x-12' : 'text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text'}`}>
                  0
                </span>
                4
              </h1>

              {/* Glitch overlay */}
              {glitchActive && (
                <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black text-cyan-400 opacity-50 transform translate-x-1 -translate-y-1 pointer-events-none">
                  404
                </div>
              )}
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Oops! App Not Found
              </h2>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                Looks like this app got lost in the digital void. Don't worry, even the best explorers sometimes take a wrong turn in the app universe.
              </p>

              {/* Fun error details */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md mx-auto mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-purple-400 mr-3" />
                  <span className="text-white font-semibold">Error Details</span>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Status Code:</span>
                    <span className="text-red-400 font-mono">404</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Apps Searched:</span>
                    <span className="text-blue-400 font-mono">2,847,392</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Wasted:</span>
                    <span className="text-green-400 font-mono">0.003s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-12">
              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="Search for apps instead..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all flex items-center backdrop-blur-sm">
                <Search className="w-5 h-5 mr-2" />
                Browse Apps
              </button>
            </div>

            {/* Suggested Apps */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">
                While you're here, check out these popular apps
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedApps.map((app, index) => (
                  <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all hover:transform hover:scale-105 border border-white/20">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:rotate-6 transition-transform`}>
                        {app.icon}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{app.name}</h4>
                      <p className="text-gray-400 text-sm mb-4">{app.category}</p>

                      <div className="flex items-center mb-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white text-sm font-semibold">4.8</span>
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Install
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Message */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                <span className="text-white font-semibold text-lg">Pro Tip</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our AI-powered search can help you find exactly what you're looking for.
                Try searching for app categories like "productivity", "games", or "photo editing"
                to discover amazing new tools!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
