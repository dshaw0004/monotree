import {useState, useEffect} from 'react';
import {Search, Filter, Star, Download, Calendar, Smartphone, Grid, List, ChevronLeft, ChevronRight} from 'lucide-react';
import {Skeleton} from '~/components/ui/skeleton';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';

const url = 'https://dapi-0rv5.onrender.com/v1/appstore/app-info'
console.info(url)

interface AppInfo {
  name: string;
  platform: string;
  download_link: string;
  icon: string;
  version: string;
  developer: string;
  description: string;
  screenshots: string[] | null;
  added_on: number;
  app_id: string;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

function AppCard({app}: {app: AppInfo}) {
  return (
    <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all hover:transform hover:scale-105 border border-white/20">
      <div className="flex items-start space-x-4 mb-4">
        <img
          src={app.icon}
          alt={app.name}
          className="w-16 h-16 rounded-2xl object-cover group-hover:rotate-6 transition-transform"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/64x64/6366f1/ffffff?text=${app.name.charAt(0)}`;
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">{app.name}</h3>
          <p className="text-gray-400 text-sm">{app.developer}</p>
          <div className="flex items-center mt-1">
            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs capitalize">
              {app.platform}
            </span>
            <span className="text-gray-400 text-xs ml-2">v{app.version}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {app.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white font-semibold text-sm">{app.rating}</span>
          </div>
          <span className="text-gray-400 text-sm">{app.downloads}</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(app.added_on)}
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center">
        <Download className="w-4 h-4 mr-2" />
        Install Now
      </button>
    </div>
  );
}

const AppListItem = ({app}: {app: AppInfo}) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/15 transition-all border border-white/20">
    <div className="flex items-center space-x-4">
      <img
        src={app.icon}
        alt={app.name}
        className="w-12 h-12 rounded-xl object-cover"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/48x48/6366f1/ffffff?text=${app.name.charAt(0)}`;
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white truncate">{app.name}</h3>
            <p className="text-gray-400 text-sm">{app.developer}</p>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="text-white font-semibold text-sm">{app.rating}</span>
            </div>
            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs capitalize">
              {app.platform}
            </span>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Install
            </button>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
          {app.description}
        </p>
      </div>
    </div>
  </div>
);

async function fetchAppsInfo(): Promise<AppInfo[]> {
  const response = await axios.get(url, {
    params: {
      page_size: 10,
      page_no: 1
    }
  })
  console.table(response.data)
  return response.data as AppInfo[]
}

export default function StorePage() {
  const [apps, setApps] = useState([]);
  const [appInfo, setAppInfo] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  const platforms = ['all', 'android', 'ios', 'web', 'windows', 'mac'];
  const appsPerPage = 12;

  // Mock function to simulate API call
  const fetchApps = async (page = 1, search = '', platform = 'all', sort = 'newest') => {
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data - replace with actual API call
    const mockApps = Array.from({length: 48}, (_, i) => ({
      app_id: `app_${i + 1}`,
      name: `App ${i + 1}`,
      platform: platforms[Math.floor(Math.random() * (platforms.length - 1)) + 1],
      download_link: `https://example.com/download/${i + 1}`,
      icon: `https://picsum.photos/64/64?random=${i + 1}`,
      version: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      developer: `Developer ${Math.floor(Math.random() * 20) + 1}`,
      description: `This is an amazing app that helps you accomplish great things. App ${i + 1} is designed with user experience in mind and offers cutting-edge features.`,
      screenshots: [
        `https://picsum.photos/300/600?random=${i + 100}`,
        `https://picsum.photos/300/600?random=${i + 200}`,
        `https://picsum.photos/300/600?random=${i + 300}`
      ],
      added_on: Date.now() - Math.random() * 10000000000,
      rating: (Math.random() * 2 + 3).toFixed(1),
      downloads: `${Math.floor(Math.random() * 10)}M+`
    }));

    // Filter and sort logic
    let filteredApps = mockApps;

    if (search) {
      filteredApps = filteredApps.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.developer.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (platform !== 'all') {
      filteredApps = filteredApps.filter(app => app.platform === platform);
    }

    // Sort logic
    switch (sort) {
      case 'newest':
        filteredApps.sort((a, b) => b.added_on - a.added_on);
        break;
      case 'oldest':
        filteredApps.sort((a, b) => a.added_on - b.added_on);
        break;
      case 'name':
        filteredApps.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filteredApps.sort((a, b) => b.rating - a.rating);
        break;
    }

    // Pagination
    const startIndex = (page - 1) * appsPerPage;
    const endIndex = startIndex + appsPerPage;
    const paginatedApps = filteredApps.slice(startIndex, endIndex);

    setApps(paginatedApps);
    setTotalPages(Math.ceil(filteredApps.length / appsPerPage));
    setLoading(false);
  };

  useEffect(() => {
    fetchApps(currentPage, searchQuery, selectedPlatform, sortBy);
  }, [currentPage, searchQuery, selectedPlatform, sortBy]);

  useEffect(()=> {
    (async function(){
      const data = await fetchAppsInfo()
      setAppInfo(data);
    })()
  }, [])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };




  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-start space-x-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-2xl bg-white/20" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4 bg-white/20" />
                  <Skeleton className="h-4 w-1/2 bg-white/20" />
                  <Skeleton className="h-4 w-2/3 bg-white/20" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full bg-white/20" />
                <Skeleton className="h-4 w-4/5 bg-white/20" />
                <Skeleton className="h-4 w-3/5 bg-white/20" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-4 w-1/3 bg-white/20" />
                <Skeleton className="h-4 w-1/4 bg-white/20" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl bg-white/20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-xl bg-white/20" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48 bg-white/20" />
                      <Skeleton className="h-4 w-32 bg-white/20" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-16 bg-white/20" />
                      <Skeleton className="h-6 w-20 rounded-full bg-white/20" />
                      <Skeleton className="h-8 w-16 rounded-lg bg-white/20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-4/5 bg-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              App Store
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing apps, tools, and games from developers around the world
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search apps, developers..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">

                {/* Platform Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedPlatform}
                    onChange={(e) => handlePlatformChange(e.target.value)}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {platforms.map(platform => (
                      <option key={platform} value={platform} className="bg-gray-800 text-white">
                        {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest" className="bg-gray-800 text-white">Newest First</option>
                  <option value="oldest" className="bg-gray-800 text-white">Oldest First</option>
                  <option value="name" className="bg-gray-800 text-white">Name A-Z</option>
                  <option value="rating" className="bg-gray-800 text-white">Highest Rated</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Apps Grid/List */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {apps.map((app) => (
                    <AppCard key={app.app_id} app={app} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-12">
                  {apps.map((app) => (
                    <AppListItem key={app.app_id} app={app} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === pageNum
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/15 transition-all"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}

              {/* No Results */}
              {!loading && apps.length === 0 && (
                <div className="text-center py-16">
                  <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">No Apps Found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedPlatform('all');
                      setSortBy('newest');
                      setCurrentPage(1);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
