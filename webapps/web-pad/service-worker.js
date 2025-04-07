// Web Pad Service Worker
const CACHE_NAME = 'web-pad-cache-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/assets/favicon.png',
  '/assets/new-document.png',
  '/assets/save-document.svg',
  '/assets/open-document.svg'
];

// List of supported text file extensions
const TEXT_FILE_EXTENSIONS = [
  '.txt', '.text', '.log', 
  '.md', '.markdown', 
  '.html', '.htm', 
  '.css', 
  '.js', 
  '.json', 
  '.xml'
];

// MIME types map for file extensions
const MIME_TYPES = {
  '.txt': 'text/plain',
  '.text': 'text/plain',
  '.log': 'text/plain',
  '.md': 'text/markdown',
  '.markdown': 'text/markdown',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'text/xml'
};

// Fix path issues by ensuring paths start with / and removing duplicates
function normalizePath(path) {
  // Ensure path starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  // Remove any double slashes
  return path.replace(/\/+/g, '/');
}

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE.map(url => {
          // Handle relative URLs properly
          if (url.startsWith('/')) {
            return url;
          } else {
            return '/' + url;
          }
        }));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches and claim clients for immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((name) => {
            return name !== CACHE_NAME;
          }).map((name) => {
            return caches.delete(name);
          })
        );
      }),
      // Claim clients so the page is controlled immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Normalize the URL
  const originalUrl = new URL(event.request.url);
  
  // Skip Google Analytics and other non-GET requests
  if (event.request.method !== 'GET' || 
      originalUrl.hostname.includes('google-analytics.com') ||
      originalUrl.hostname.includes('googletagmanager.com')) {
    return;
  }

  // Check if this is a request for a text file
  const path = originalUrl.pathname.toLowerCase();
  
  // First, check if this is one of our app's own files - don't redirect these
  const isAppFile = path.includes('/assets/') ||
                    path === '/index.html' ||
                    path === '/' ||
                    path === '/manifest.json' ||
                    path === '/script.js' ||
                    path === '/styles.css';
  
  if (isAppFile) {
    // Handle normally - don't redirect our own files
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
    return;
  }
  
  // Then check if it's a text file that should be opened in the editor
  const isTextFile = TEXT_FILE_EXTENSIONS.some(ext => path.endsWith(ext));
  
  // Special handling for Android intent file opening
  if (isTextFile && !originalUrl.searchParams.has('file')) {
    // Redirect text file requests to the app with the file parameter
    event.respondWith(
      // Create a client-side redirect to handle the file
      new Response('', {
        status: 303,
        statusText: 'See Other',
        headers: new Headers({
          'Location': `/index.html?file=${encodeURIComponent(event.request.url)}`
        })
      })
    );
    return;
  }
  
  // Standard fetch handling for other requests
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Add to cache for future requests
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // If network request fails and it's a navigation, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// This handles the share_target and file request activity
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle share_target requests and file opening
  if ((url.pathname === '/index.html' || url.pathname === 'index.html') && 
     (url.searchParams.has('content') || 
      url.searchParams.has('file') || 
      url.searchParams.has('url'))) {
    
    // Let the page handle this directly
    return;
  }
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  // Handle skip waiting message for service worker updates
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Handle file open intention
  if (event.data && event.data.type === 'OPEN_FILE' && event.data.url) {
    // Notify all clients that we want to open a file
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'OPEN_FILE',
          url: event.data.url
        });
      });
    });
  }
}); 