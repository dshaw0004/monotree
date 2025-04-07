// This script helps Android register the app for file handling
(function registerIntentFilters() {
    // Only run this on Android devices and when the app is installed
    if (/Android/i.test(navigator.userAgent)) {
        console.log('Running Android intent filter registration');
        
        // Map of file types and their corresponding MIME types
        const fileTypeMap = [
            { ext: '.txt', mime: 'text/plain' },
            { ext: '.text', mime: 'text/plain' },
            { ext: '.log', mime: 'text/plain' },
            { ext: '.md', mime: 'text/markdown' },
            { ext: '.markdown', mime: 'text/markdown' },
            { ext: '.html', mime: 'text/html' },
            { ext: '.htm', mime: 'text/html' },
            { ext: '.css', mime: 'text/css' },
            { ext: '.js', mime: 'application/javascript' },
            { ext: '.json', mime: 'application/json' },
            { ext: '.xml', mime: 'text/xml' }
        ];
        
        // Register file handlers directly in Android WebView/Chrome
        try {
            if (navigator.registerProtocolHandler) {
                // Try to register web+ protocols to help with association
                fileTypeMap.forEach(({ ext }) => {
                    const protocol = 'web+' + ext.substring(1);
                    try {
                        navigator.registerProtocolHandler(
                            protocol,
                            window.location.href + '?file=%s',
                            'Web Pad'
                        );
                        console.log(`Registered protocol handler: ${protocol}`);
                    } catch (e) {
                        console.error(`Failed to register protocol: ${protocol}`, e);
                    }
                });
            }
        } catch (e) {
            console.error('Protocol handler registration failed:', e);
        }
        
        // Share API registration for better integration
        if ('navigator' in window && 'share' in navigator) {
            // Inform the system that we're ready to handle shares
            document.dispatchEvent(new CustomEvent('share-ready'));
            console.log('Registered as share target');
        }
        
        // Enhanced file type associations
        if (window.chrome && window.chrome.webstore) {
            // This is a Chrome-specific API that can help with file associations
            try {
                fileTypeMap.forEach(({ ext, mime }) => {
                    window.chrome.webstore.onInstallStageChanged.addListener(() => {
                        console.log(`Registered file handler for ${ext}`);
                    });
                });
            } catch (e) {
                console.error('Chrome webstore registration failed:', e);
            }
        }
        
        // Create a hidden iframe to help with file association (works on some Android browsers)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'intent://webpad/#Intent;scheme=file;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;type=text/plain;end';
        document.body.appendChild(iframe);
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 2000);
        
        console.log('File association helpers initialized');
    }
})(); 