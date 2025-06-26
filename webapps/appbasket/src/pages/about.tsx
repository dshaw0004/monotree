import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Users, Globe, Shield, Zap, Heart, Award, Rocket, Code, Lightbulb, Target, ChevronRight, Star, TrendingUp} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function About() {
  // const [scrollY, setScrollY] = useState(0);
  // const [visibleStats, setVisibleStats] = useState({});

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const stats = [
    {number: '50M+', label: 'Active Users', icon: Users},
    {number: '2.5M+', label: 'Apps Available', icon: Globe},
    {number: '180+', label: 'Countries', icon: Globe},
    {number: '500K+', label: 'Developers', icon: Code},
    {number: '99.9%', label: 'Uptime', icon: Shield},
    {number: '4.8/5', label: 'User Rating', icon: Star}
  ];

  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'AppVault was founded with a simple mission: democratize app discovery and make quality software accessible to everyone.',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Launched in 50 countries, reaching our first million users and establishing partnerships with major developers.',
      icon: Globe,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2021',
      title: 'AI Integration',
      description: 'Introduced AI-powered recommendations and smart curation, revolutionizing how users discover new applications.',
      icon: Lightbulb,
      color: 'from-green-500 to-teal-500'
    },
    {
      year: '2022',
      title: 'Security First',
      description: 'Implemented advanced security protocols and became the first app store with end-to-end encrypted downloads.',
      icon: Shield,
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2023',
      title: 'Community Focus',
      description: 'Launched developer tools and community features, empowering creators and fostering innovation.',
      icon: Users,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      year: '2024',
      title: 'Next Generation',
      description: 'Reached 50M+ users and introduced cutting-edge features that set new industry standards.',
      icon: TrendingUp,
      color: 'from-emerald-500 to-cyan-500'
    }
  ];

  const team = [
    {
      name: 'Dipankar Shaw',
      role: 'CEO & Founder & Developer',
      bio: 'Former tech executive with 1+ years in software development and platform architecture.',
      avatar: '👩‍💼',
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Claude Sonnet 4',
      role: 'Head of Design',
      bio: 'Award-winning UX designer passionate about creating intuitive digital experiences.',
      avatar: '👩‍🎨',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every decision we make puts our users first, ensuring the best possible experience.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'We protect user data with military-grade encryption and transparent privacy policies.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge features and experiences.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a vibrant ecosystem where developers and users thrive together.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We maintain the highest standards for every app and service on our platform.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Accessibility',
      description: 'We make great software accessible to everyone, regardless of background or ability.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-gray-300 border border-white/20 mb-8">
              <Rocket className="w-4 h-4 mr-2 text-blue-400" />
              Empowering digital discovery since 2019
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Revolutionizing How the World
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> Discovers Apps</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            At AppVault, we believe great software should be accessible to everyone. We're building the future of app discovery,
            one download at a time, powered by cutting-edge AI and an unwavering commitment to user experience.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're on a mission to democratize software discovery and make the world's best applications
                accessible to everyone, everywhere. Through innovative technology and user-centric design,
                we're building bridges between creators and users.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Lightning-Fast Discovery</h3>
                    <p className="text-gray-300">AI-powered recommendations that understand your needs before you do.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Uncompromising Security</h3>
                    <p className="text-gray-300">Every app is rigorously tested and verified for your safety and privacy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Global Community</h3>
                    <p className="text-gray-300">Connecting millions of users with developers worldwide.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">180+</div>
                    <div className="text-gray-300 text-sm">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-gray-300 text-sm">Global Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">5B+</div>
                    <div className="text-gray-300 text-sm">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">95%</div>
                    <div className="text-gray-300 text-sm">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the future we're building together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105 border border-white/20">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From a bold idea to a global platform trusted by millions
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative flex items-center mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                      <div className="text-2xl font-bold text-white mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center border-4 border-slate-900">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The passionate innovators behind AppVault's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105 border border-white/20 text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:rotate-6 transition-transform`}>
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to be part of the future of app discovery? Whether you're a developer, creator, or passionate user,
            there's a place for you in the App Basket community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to='/store'>
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 flex items-center justify-center">
                Start Your Journey
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="border-2 border-white/30 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
