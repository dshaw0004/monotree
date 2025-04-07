document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const notepadContent = document.getElementById('notepad-content');
    const newBtn = document.getElementById('new-btn');
    const saveBtn = document.getElementById('save-btn');
    const loadBtn = document.getElementById('load-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const fileInput = document.getElementById('file-input');
    const filenameInput = document.getElementById('filename-input');
    const status = document.getElementById('status');
    const charCount = document.getElementById('char-count');
    const notepadContainer = document.querySelector('.notepad-container');
    
    // Variables
    let currentFileName = 'untitled.txt';
    let isModified = false;
    let isFullscreen = true; // Start in fullscreen mode
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    // Handle different actions from URL parameters
    if (action === 'new') {
        createNewDocument();
    } else if (urlParams.has('content')) {
        // This handles content from share_target in the manifest
        const sharedContent = urlParams.get('content');
        notepadContent.value = sharedContent;
        
        // If title is provided, use it as filename
        if (urlParams.has('title')) {
            let title = urlParams.get('title');
            if (!title.endsWith('.txt')) {
                title += '.txt';
            }
            currentFileName = title;
            filenameInput.value = currentFileName;
        }
        
        updateCharCount();
    } else if (urlParams.has('file')) {
        // Handle file parameter from protocol handlers
        const fileUrl = urlParams.get('file');
        
        // Process the file URL - could be a local file path or a web URL
        processFileUrl(fileUrl)
            .then(result => {
                if (result) {
                    updateStatus('File opened');
                } else {
                    updateStatus('Failed to open file');
                }
            })
            .catch(() => {
                updateStatus('Error opening file');
            });
    }
    
    // Listen for messages from the service worker
    if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'OPEN_FILE' && event.data.url) {
                processFileUrl(event.data.url);
            }
        });
    }
    
    // Register for file handling events (for when a file is opened with the app)
    if ('launchQueue' in window) {
        window.launchQueue.setConsumer(launchParams => {
            if (!launchParams.files.length) return;
            
            // Process the first file
            const fileHandle = launchParams.files[0];
            fileHandle.getFile().then(file => {
                loadDocument(file);
            });
        });
    }
    
    // Initialize
    updateCharCount();
    notepadContent.focus();
    filenameInput.value = currentFileName;
    
    // Event Listeners
    notepadContent.addEventListener('input', () => {
        isModified = true;
        updateStatus('Modified');
        updateCharCount();
    });
    
    newBtn.addEventListener('click', () => {
        if (isModified) {
            if (confirm('You have unsaved changes. Continue?')) {
                createNewDocument();
            }
        } else {
            createNewDocument();
        }
    });
    
    saveBtn.addEventListener('click', () => {
        saveDocument();
    });
    
    loadBtn.addEventListener('click', () => {
        if (isModified) {
            if (confirm('You have unsaved changes. Continue?')) {
                fileInput.click();
            }
        } else {
            fileInput.click();
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            loadDocument(e.target.files[0]);
        }
    });
    
    fullscreenBtn.addEventListener('click', () => {
        toggleFullscreen();
    });
    
    filenameInput.addEventListener('input', (e) => {
        currentFileName = e.target.value;
        
        // Don't auto-add extensions during typing
        // We'll handle that on blur
    });
    
    filenameInput.addEventListener('blur', () => {
        // Get the filename
        currentFileName = filenameInput.value;
        
        // Check if it has any valid extension
        const validExtensions = ['.txt', '.text', '.log', '.md', '.markdown', '.html', '.htm', '.css', '.js', '.json', '.xml'];
        const hasValidExtension = validExtensions.some(ext => currentFileName.toLowerCase().endsWith(ext));
        
        // If no valid extension, add .txt as default
        if (!hasValidExtension) {
            currentFileName += '.txt';
            filenameInput.value = currentFileName;
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveDocument();
        }
        
        // Ctrl+O to open
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            if (!isModified || confirm('You have unsaved changes. Continue?')) {
                fileInput.click();
            }
        }
        
        // Ctrl+N for new document
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            if (!isModified || confirm('You have unsaved changes. Continue?')) {
                createNewDocument();
            }
        }
        
        // F11 or Escape for fullscreen toggle
        if ((e.ctrlKey && e.key === 'F11') || (e.key === 'Escape' && isFullscreen)) {
            e.preventDefault();
            toggleFullscreen();
        }
    });
    
    // Functions
    function createNewDocument() {
        notepadContent.value = '';
        currentFileName = 'untitled.txt';
        filenameInput.value = currentFileName;
        isModified = false;
        updateStatus('New document created');
        updateCharCount();
        notepadContent.focus();
    }
    
    function saveDocument() {
        const text = notepadContent.value;
        let mimeType = 'text/plain';
        let extension = '.txt';
        
        // Determine MIME type and extension based on file extension
        if (currentFileName.endsWith('.md') || currentFileName.endsWith('.markdown')) {
            mimeType = 'text/markdown';
            extension = currentFileName.endsWith('.md') ? '.md' : '.markdown';
        } else if (currentFileName.endsWith('.html') || currentFileName.endsWith('.htm')) {
            mimeType = 'text/html';
            extension = currentFileName.endsWith('.html') ? '.html' : '.htm';
        } else if (currentFileName.endsWith('.css')) {
            mimeType = 'text/css';
            extension = '.css';
        } else if (currentFileName.endsWith('.js')) {
            mimeType = 'application/javascript';
            extension = '.js';
        } else if (currentFileName.endsWith('.json')) {
            mimeType = 'application/json';
            extension = '.json';
        } else if (currentFileName.endsWith('.xml')) {
            mimeType = 'text/xml';
            extension = '.xml';
        } else if (currentFileName.endsWith('.log')) {
            mimeType = 'text/plain';
            extension = '.log';
        } else if (currentFileName.endsWith('.text')) {
            mimeType = 'text/plain';
            extension = '.text';
        } else {
            // Default to .txt
            mimeType = 'text/plain';
            extension = '.txt';
        }
        
        // Try to use the File System Access API first (if available)
        if ('showSaveFilePicker' in window) {
            const options = {
                suggestedName: currentFileName,
                types: [{
                    description: 'Text Documents',
                    accept: {
                        [mimeType]: [extension]
                    }
                }]
            };
            
            showSaveFilePicker(options)
                .then(fileHandle => fileHandle.createWritable())
                .then(writable => {
                    writable.write(text);
                    return writable.close();
                })
                .then(() => {
                    isModified = false;
                    updateStatus('Saved to device');
                })
                .catch(err => {
                    console.error('Error saving file:', err);
                    // If user cancels or there's an error, fall back to traditional download
                    traditionalSave();
                });
        } else {
            // Fall back to traditional method
            traditionalSave();
        }
        
        function traditionalSave() {
            // Original method as fallback
            const blob = new Blob([text], {type: mimeType});
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = currentFileName;
            a.click();
            
            URL.revokeObjectURL(url);
            isModified = false;
            
            // Show a notification about where the file is saved
            updateStatus('Saved to Downloads');
            
            // On Android, provide a notification to help find the file
            if (/Android/i.test(navigator.userAgent)) {
                setTimeout(() => {
                    alert('File saved to Downloads folder. You may need to use a file manager app to access it.');
                }, 1000);
            }
        }
    }
    
    function loadDocument(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            notepadContent.value = e.target.result;
            currentFileName = file.name;
            filenameInput.value = currentFileName;
            isModified = false;
            updateStatus(`Opened: ${file.name}`);
            updateCharCount();
            notepadContent.focus();
        };
        
        reader.onerror = function() {
            updateStatus('Error reading file');
        };
        
        reader.readAsText(file);
        fileInput.value = '';
    }
    
    function updateStatus(message) {
        status.textContent = message;
        setTimeout(() => {
            status.textContent = isModified ? 'Modified' : 'Ready';
        }, 2000);
    }
    
    function updateCharCount() {
        const count = notepadContent.value.length;
        charCount.textContent = `Characters: ${count}`;
    }
    
    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
        
        if (isFullscreen) {
            // Make fullscreen
            notepadContainer.classList.remove('windowed');
            document.body.classList.remove('windowed-body');
            updateStatus('Fullscreen mode');
        } else {
            // Make windowed
            notepadContainer.classList.add('windowed');
            document.body.classList.add('windowed-body');
            updateStatus('Windowed mode');
        }
        
        // Re-focus on the textarea
        notepadContent.focus();
    }
    
    // Function to process a file URL from protocol handler
    async function processFileUrl(fileUrl) {
        try {
            // Try to fetch the file content
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error('Failed to fetch file');
            
            const content = await response.text();
            
            // Set the content in the editor
            notepadContent.value = content;
            
            // Try to extract filename from URL
            let filename = 'untitled.txt';
            try {
                // Parse the URL to get the filename
                const url = new URL(fileUrl);
                const pathParts = url.pathname.split('/');
                if (pathParts.length > 0) {
                    const lastPart = pathParts[pathParts.length - 1];
                    if (lastPart.trim() !== '') {
                        filename = decodeURIComponent(lastPart);
                    }
                }
            } catch (e) {
                // If it's not a valid URL, try to use the raw string
                const parts = fileUrl.split('/');
                if (parts.length > 0) {
                    const lastPart = parts[parts.length - 1];
                    if (lastPart.trim() !== '') {
                        filename = lastPart;
                    }
                }
            }
            
            // Update filename
            currentFileName = filename;
            filenameInput.value = currentFileName;
            
            // Update status and count
            updateStatus(`Opened: ${filename}`);
            updateCharCount();
            
            return true;
        } catch (error) {
            console.error('Error processing file URL:', error);
            updateStatus('Failed to process file URL');
            return false;
        }
    }
}); 