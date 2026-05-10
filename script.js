// Sample wallpaper data
const staticWallpapers = [
    {
        id: 1,
        title: "Mountain Sunrise",
        category: "nature",
        resolution: "1920x1080",
        size: "2.4 MB",
        url: "https://picsum.photos/seed/mountain1/1920/1080",
        downloadUrl: "https://picsum.photos/seed/mountain1/1920/1080"
    },
    {
        id: 2,
        title: "Abstract Waves",
        category: "abstract",
        resolution: "2560x1440",
        size: "3.8 MB",
        url: "https://picsum.photos/seed/abstract1/2560/1440",
        downloadUrl: "https://picsum.photos/seed/abstract1/2560/1440"
    },
    {
        id: 3,
        title: "Circuit Board",
        category: "technology",
        resolution: "3840x2160",
        size: "5.2 MB",
        url: "https://picsum.photos/seed/tech1/3840/2160",
        downloadUrl: "https://picsum.photos/seed/tech1/3840/2160"
    },
    {
        id: 4,
        title: "Galaxy Stars",
        category: "space",
        resolution: "1920x1080",
        size: "2.8 MB",
        url: "https://picsum.photos/seed/space1/1920/1080",
        downloadUrl: "https://picsum.photos/seed/space1/1920/1080"
    },
    {
        id: 5,
        title: "Forest Path",
        category: "nature",
        resolution: "2560x1440",
        size: "4.1 MB",
        url: "https://picsum.photos/seed/forest1/2560/1440",
        downloadUrl: "https://picsum.photos/seed/forest1/2560/1440"
    },
    {
        id: 6,
        title: "Minimal Geometry",
        category: "minimal",
        resolution: "1920x1080",
        size: "1.9 MB",
        url: "https://picsum.photos/seed/minimal1/1920/1080",
        downloadUrl: "https://picsum.photos/seed/minimal1/1920/1080"
    },
    {
        id: 7,
        title: "Lion Portrait",
        category: "animals",
        resolution: "3840x2160",
        size: "6.3 MB",
        url: "https://picsum.photos/seed/lion1/3840/2160",
        downloadUrl: "https://picsum.photos/seed/lion1/3840/2160"
    },
    {
        id: 8,
        title: "Neural Network",
        category: "technology",
        resolution: "2560x1440",
        size: "3.5 MB",
        url: "https://picsum.photos/seed/neural1/2560/1440",
        downloadUrl: "https://picsum.photos/seed/neural1/2560/1440"
    }
];

const myImages = [
    {
        id: 1,
        title: "Download Wallpaper",
        category: "nature",
        resolution: "1920x1080",
        size: "2.4 MB",
        url: "download.jfif",
        downloadUrl: "download.jfif"
    },
    {
        id: 2,
        title: "Download Wallpaper 1",
        category: "abstract",
        resolution: "2560x1440",
        size: "3.8 MB",
        url: "download (1).jfif",
        downloadUrl: "download (1).jfif"
    },
    {
        id: 3,
        title: "Download Wallpaper 2",
        category: "technology",
        resolution: "3840x2160",
        size: "5.2 MB",
        url: "download (2).jfif",
        downloadUrl: "download (2).jfif"
    },
    {
        id: 4,
        title: "Kevin Wallpaper",
        category: "space",
        resolution: "1920x1080",
        size: "2.8 MB",
        url: "kevin.jfif",
        downloadUrl: "kevin.jfif"
    }
];

// Sample live wallpaper data
const liveWallpapers = [
    {
        id: 1,
        title: "Ocean Waves",
        category: "nature",
        resolution: "1920x1080",
        size: "15.2 MB",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 2,
        title: "Fire Animation",
        category: "abstract",
        resolution: "2560x1440",
        size: "22.8 MB",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 3,
        title: "Matrix Rain",
        category: "technology",
        resolution: "1920x1080",
        size: "18.5 MB",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        id: 4,
        title: "Northern Lights",
        category: "space",
        resolution: "3840x2160",
        size: "35.2 MB",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        downloadUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
];

// Settings management
const defaultSettings = {
    theme: 'dark',
    primaryColor: '#6366f1',
    accentColor: '#8b5cf6',
    gridColumns: '3',
    cardSpacing: '20',
    autoPlayVideos: true,
    videoVolume: '50',
    fontSize: 'medium',
    fontFamily: 'Segoe UI'
};

let currentSettings = { ...defaultSettings };

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    loadStaticWallpapers();
    loadMyImages();
    loadLiveWallpapers();
    setupEventListeners();
    setupSettingsListeners();
});

// Load static wallpapers
function loadStaticWallpapers(filter = 'all', search = '') {
    const container = document.getElementById('staticWallpapers');
    container.innerHTML = '';
    
    let filteredWallpapers = staticWallpapers;
    
    // Apply category filter
    if (filter !== 'all') {
        filteredWallpapers = filteredWallpapers.filter(w => w.category === filter);
    }
    
    // Apply search filter
    if (search) {
        filteredWallpapers = filteredWallpapers.filter(w => 
            w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.category.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Apply resolution filter
    const resolutionFilter = document.getElementById('resolutionFilter').value;
    if (resolutionFilter !== 'all') {
        filteredWallpapers = filteredWallpapers.filter(w => w.resolution === resolutionFilter);
    }
    
    filteredWallpapers.forEach(wallpaper => {
        const card = createWallpaperCard(wallpaper, 'static');
        container.appendChild(card);
    });
    
    if (filteredWallpapers.length === 0) {
        container.innerHTML = '<div class="loading">No wallpapers found matching your criteria.</div>';
    }
}

// Load live wallpapers
function loadLiveWallpapers(filter = 'all', search = '') {
    const container = document.getElementById('liveWallpapers');
    container.innerHTML = '';
    
    let filteredWallpapers = liveWallpapers;
    
    // Apply category filter
    if (filter !== 'all') {
        filteredWallpapers = filteredWallpapers.filter(w => w.category === filter);
    }
    
    // Apply search filter
    if (search) {
        filteredWallpapers = filteredWallpapers.filter(w => 
            w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.category.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    filteredWallpapers.forEach(wallpaper => {
        const card = createWallpaperCard(wallpaper, 'live');
        container.appendChild(card);
    });
}

// Load my images section
function loadMyImages() {
    const container = document.getElementById('myImagesGallery');
    container.innerHTML = '';

    myImages.forEach(image => {
        const card = createWallpaperCard(image, 'static');
        container.appendChild(card);
    });
}

// Create wallpaper card
function createWallpaperCard(wallpaper, type) {
    const card = document.createElement('div');
    card.className = type === 'live' ? 'live-wallpaper-card' : 'wallpaper-card';
    
    if (type === 'live') {
        card.innerHTML = `
            <div class="live-badge">LIVE</div>
            <video class="live-wallpaper-video" muted loop autoplay>
                <source src="${wallpaper.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="live-wallpaper-info">
                <div class="live-wallpaper-title">${wallpaper.title}</div>
                <div class="live-wallpaper-meta">
                    ${wallpaper.resolution} • ${wallpaper.size}
                </div>
                <button class="download-btn" onclick="downloadWallpaper('${wallpaper.downloadUrl}', '${wallpaper.title}', '${type}')">
                    <i class="fas fa-download"></i>
                    Download Live Wallpaper
                </button>
            </div>
        `;
    } else {
        card.innerHTML = `
            <img src="${wallpaper.url}" alt="${wallpaper.title}" class="wallpaper-image" onclick="openModal('${wallpaper.url}', '${wallpaper.title}', 'image')">
            <div class="wallpaper-info">
                <div class="wallpaper-title">${wallpaper.title}</div>
                <div class="wallpaper-meta">
                    ${wallpaper.resolution} • ${wallpaper.size}
                </div>
                <button class="download-btn" onclick="downloadWallpaper('${wallpaper.downloadUrl}', '${wallpaper.title}', 'static')">
                    <i class="fas fa-download"></i>
                    Download Wallpaper
                </button>
            </div>
        `;
    }
    
    return card;
}

// Download wallpaper function
function downloadWallpaper(url, title, type) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    const extension = type === 'live' ? 'mp4' : (url.split('.').pop().split('?')[0] || 'jpg');
    link.href = encodeURI(url);
    link.download = `${title.replace(/\s+/g, '_')}.${extension}`;
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification(`Downloading ${title}...`);
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Resolution filter
    const resolutionFilter = document.getElementById('resolutionFilter');
    resolutionFilter.addEventListener('change', function() {
        loadStaticWallpapers('all', searchInput.value);
    });
    
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            loadStaticWallpapers(category);
            loadLiveWallpapers(category);
            
            // Scroll to static wallpapers section
            document.getElementById('static').scrollIntoView({ behavior: 'smooth' });
            
            // Update active state
            categoryCards.forEach(c => c.style.background = 'rgba(255, 255, 255, 0.05)');
            this.style.background = 'rgba(99, 102, 241, 0.2)';
        });
    });
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Modal close on outside click
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('previewModal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    loadStaticWallpapers('all', searchTerm);
    loadLiveWallpapers('all', searchTerm);
}

// Modal functions
function openModal(url, title, type) {
    const modal = document.getElementById('previewModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (type === 'image') {
        modalContent.innerHTML = `
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <img src="${url}" alt="${title}" class="modal-image">
            <div style="color: white; margin-top: 1rem;">
                <h3>${title}</h3>
                <button class="download-btn" style="margin-top: 1rem; max-width: 300px;" onclick="downloadWallpaper('${url}', '${title}', 'static')">
                    <i class="fas fa-download"></i>
                    Download Wallpaper
                </button>
            </div>
        `;
    } else if (type === 'video') {
        modalContent.innerHTML = `
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <video controls autoplay class="modal-video">
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div style="color: white; margin-top: 1rem;">
                <h3>${title}</h3>
                <button class="download-btn" style="margin-top: 1rem; max-width: 300px;" onclick="downloadWallpaper('${url}', '${title}', 'live')">
                    <i class="fas fa-download"></i>
                    Download Live Wallpaper
                </button>
            </div>
        `;
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'none';
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add modal to HTML if not exists
if (!document.getElementById('previewModal')) {
    const modal = document.createElement('div');
    modal.id = 'previewModal';
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-content"></div>';
    document.body.appendChild(modal);
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Settings functions
function loadSettings() {
    const saved = localStorage.getItem('wallpaperHubSettings');
    if (saved) {
        currentSettings = { ...defaultSettings, ...JSON.parse(saved) };
        applySettings();
        updateSettingsUI();
    }
}

function saveSettings() {
    localStorage.setItem('wallpaperHubSettings', JSON.stringify(currentSettings));
    applySettings();
    showNotification('Settings saved successfully!');
}

function applySettings() {
    // Apply theme
    if (currentSettings.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    
    // Apply colors
    document.documentElement.style.setProperty('--primary-color', currentSettings.primaryColor);
    document.documentElement.style.setProperty('--accent-color', currentSettings.accentColor);
    
    // Apply grid columns
    const grids = document.querySelectorAll('.wallpaper-grid, .live-wallpaper-grid');
    grids.forEach(grid => {
        grid.style.gridTemplateColumns = `repeat(${currentSettings.gridColumns}, 1fr)`;
    });
    
    // Apply card spacing
    const cards = document.querySelectorAll('.wallpaper-card, .live-wallpaper-card');
    cards.forEach(card => {
        card.style.margin = currentSettings.cardSpacing + 'px';
    });
    
    // Apply video settings
    const videos = document.querySelectorAll('.live-wallpaper-video');
    videos.forEach(video => {
        video.muted = !currentSettings.autoPlayVideos;
        video.volume = currentSettings.videoVolume / 100;
        if (currentSettings.autoPlayVideos) {
            video.play();
        } else {
            video.pause();
        }
    });
    
    // Apply font settings
    document.body.style.fontSize = getFontSize(currentSettings.fontSize);
    document.body.style.fontFamily = currentSettings.fontFamily;
}

function getFontSize(size) {
    const sizes = {
        'small': '14px',
        'medium': '16px',
        'large': '18px',
        'extra-large': '20px'
    };
    return sizes[size] || '16px';
}

function updateSettingsUI() {
    document.getElementById('themeSelect').value = currentSettings.theme;
    document.getElementById('primaryColor').value = currentSettings.primaryColor;
    document.getElementById('accentColor').value = currentSettings.accentColor;
    document.getElementById('gridColumns').value = currentSettings.gridColumns;
    document.getElementById('cardSpacing').value = currentSettings.cardSpacing;
    document.getElementById('spacingValue').textContent = currentSettings.cardSpacing + 'px';
    document.getElementById('autoPlayVideos').checked = currentSettings.autoPlayVideos;
    document.getElementById('videoVolume').value = currentSettings.videoVolume;
    document.getElementById('volumeValue').textContent = currentSettings.videoVolume + '%';
    document.getElementById('fontSize').value = currentSettings.fontSize;
    document.getElementById('fontFamily').value = currentSettings.fontFamily;
}

function setupSettingsListeners() {
    // Theme select
    document.getElementById('themeSelect').addEventListener('change', function() {
        currentSettings.theme = this.value;
    });
    
    // Color pickers
    document.getElementById('primaryColor').addEventListener('input', function() {
        currentSettings.primaryColor = this.value;
    });
    
    document.getElementById('accentColor').addEventListener('input', function() {
        currentSettings.accentColor = this.value;
    });
    
    // Grid columns
    document.getElementById('gridColumns').addEventListener('change', function() {
        currentSettings.gridColumns = this.value;
    });
    
    // Card spacing
    document.getElementById('cardSpacing').addEventListener('input', function() {
        currentSettings.cardSpacing = this.value;
        document.getElementById('spacingValue').textContent = this.value + 'px';
    });
    
    // Video settings
    document.getElementById('autoPlayVideos').addEventListener('change', function() {
        currentSettings.autoPlayVideos = this.checked;
    });
    
    document.getElementById('videoVolume').addEventListener('input', function() {
        currentSettings.videoVolume = this.value;
        document.getElementById('volumeValue').textContent = this.value + '%';
    });
    
    // Font settings
    document.getElementById('fontSize').addEventListener('change', function() {
        currentSettings.fontSize = this.value;
    });
    
    document.getElementById('fontFamily').addEventListener('change', function() {
        currentSettings.fontFamily = this.value;
    });
    
    // Save and reset buttons
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    
    document.getElementById('resetSettings').addEventListener('click', function() {
        currentSettings = { ...defaultSettings };
        updateSettingsUI();
        applySettings();
        showNotification('Settings reset to default!');
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
