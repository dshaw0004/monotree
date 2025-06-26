import {Download, Star, Shield, Zap, Users, ChevronRight} from 'lucide-react';
import Header from '@/components/header';
import {Link} from 'react-router-dom';
import Footer from '@/components/footer';

export default function HomePage() {
  const featuredApps = [
    {name: 'Track My Attendance', category: 'Productivity', rating: 4.8, downloads: '2', icon: '📸', color: 'from-purple-500 to-pink-500'},
    {name: 'Dictionary', category: 'Education', rating: 4.9, downloads: '1', icon: '✅', color: 'from-blue-500 to-cyan-500'},
    {name: 'Imagic', category: 'Photography', rating: 4.7, downloads: '2', icon: '🧘', color: 'from-green-500 to-teal-500'},
    {name: 'Dev Community', category: 'News', rating: 4.9, downloads: '1', icon: '💻', color: 'from-orange-500 to-red-500'},
    {name: 'AAi1', category: 'AI', rating: 4.6, downloads: '1', icon: '🎵', color: 'from-indigo-500 to-purple-500'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-pulse">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-300 border border-white/20">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              Now featuring AI-powered app recommendations
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Apps That
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Transform</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore {false && 'millions of'} cutting-edge apps, games, and tools. From productivity powerhouses to creative masterpieces,
            find everything you need in one revolutionary platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to={'/store'}>
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Start Exploring
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            {/*<button className="group border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all flex items-center backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>*/}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5</div>
              <div className="text-gray-400">Apps Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1</div>
              <div className="text-gray-400">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section id="apps" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Apps</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Handpicked applications that are changing the way people work, play, and create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredApps.map((app, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all hover:transform hover:scale-105 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center text-2xl mr-4 group-hover:rotate-6 transition-transform`}>
                    {app.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{app.name}</h3>
                    <p className="text-gray-400">{app.category}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-semibold">{app.rating}</span>
                  </div>
                  <div className="text-gray-300">{app.downloads} downloads</div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                  Install Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose AppVault?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of app discovery with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ultra Secure</h3>
              <p className="text-gray-300 leading-relaxed">
                Military-grade encryption and rigorous security audits ensure your data and downloads are always protected
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300 leading-relaxed">
                Powered by global CDN and smart caching, experience instant downloads and seamless browsing
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
              <p className="text-gray-300 leading-relaxed">
                Join millions of users sharing reviews, recommendations, and discovering amazing apps together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Digital Experience?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join millions of users who have already discovered their next favorite app
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/store">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105">
                Get Started Free
              </button>
            </Link>
            <Link to={'/about'}>
              <button className="border-2 border-white/30 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
