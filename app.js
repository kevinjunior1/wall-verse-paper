// Wallpaper Application

class WallpaperApp {
    constructor() {
        this.wallpapers = this.getWallpapers();
        this.filteredWallpapers = this.wallpapers;
        this.currentWallpaper = null;
        this.init();
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', () => this.filterWallpapers());

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', () => this.filterWallpapers());

        // Modal close
        document.querySelector('.close-btn').addEventListener('click', () => this.closeModal());
        document.getElementById('wallpaperModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('wallpaperModal')) {
                this.closeModal();
            }
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => this.handleDownload());

        // View source button
        document.getElementById('viewSourceBtn').addEventListener('click', () => this.viewSource());
    }

    getWallpapers() {
        // Curated collection of wallpapers from Unsplash
        return [
            {
                id: 1,
                title: 'Mountain Sunset',
                category: 'landscape',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
                source: 'Unsplash - Alex Azabache'
            },
            {
                id: 2,
                title: 'Ocean Waves',
                category: 'nature',
                url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80',
                source: 'Unsplash - Jeremy Bishop'
            },
            {
                id: 3,
                title: 'Forest Path',
                category: 'nature',
                url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
                source: 'Unsplash - Jeremy Bishop'
            },
            {
                id: 4,
                title: 'Space Galaxy',
                category: 'space',
                url: 'https://images.unsplash.com/photo-1462332420958-a05d1e7413413?w=1920&q=80',
                source: 'Unsplash - Ganapati'
            },
            {
                id: 5,
                title: 'Tech Abstract',
                category: 'technology',
                url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
                source: 'Unsplash - Domenico Loia'
            },
            {
                id: 6,
                title: 'Minimalist Lines',
                category: 'minimalist',
                url: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=1920&q=80',
                source: 'Unsplash - Pawel Czerwinski'
            },
            {
                id: 7,
                title: 'Desert Landscape',
                category: 'landscape',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
                source: 'Unsplash - Alex Azabache'
            },
            {
                id: 8,
                title: 'Colourful Abstract',
                category: 'abstract',
                url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&q=80',
                source: 'Unsplash - Pawel Czerwinski'
            },
            {
                id: 9,
                title: 'Northern Lights',
                category: 'space',
                url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&q=80',
                source: 'Unsplash - Jonatan Pie'
            },
            {
                id: 10,
                title: 'Purple Gradient',
                category: 'minimalist',
                url: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=1920&q=80',
                source: 'Unsplash - Pawel Czerwinski'
            },
            {
                id: 11,
                title: 'Neon City',
                category: 'technology',
                url: 'https://images.unsplash.com/photo-1559346881-80f1ea9de62f?w=1920&q=80',
                source: 'Unsplash - Josh Rangel'
            },
            {
                id: 12,
                title: 'Waterfall',
                category: 'nature',
                url: 'https://images.unsplash.com/photo-1432405972618-c60b0b12d144?w=1920&q=80',
                source: 'Unsplash - Joachim Köhler'
            }
        ];
    }

    renderGallery() {
        const gallery = document.getElementById('wallpaperGallery');
        const noResults = document.getElementById('noResults');

        if (this.filteredWallpapers.length === 0) {
            gallery.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        gallery.innerHTML = this.filteredWallpapers.map(wp => `
            <div class="gallery-item" onclick="app.openModal(${wp.id})">
                <img src="${wp.url}" alt="${wp.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-title">${wp.title}</div>
                    <div class="gallery-category">${wp.category}</div>
                </div>
            </div>
        `).join('');
    }

    filterWallpapers() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value;

        this.filteredWallpapers = this.wallpapers.filter(wp => {
            const matchSearch = wp.title.toLowerCase().includes(searchTerm);
            const matchCategory = category === '' || wp.category === category;
            return matchSearch && matchCategory;
        });

        this.renderGallery();
    }

    openModal(wallpaperId) {
        this.currentWallpaper = this.wallpapers.find(wp => wp.id === wallpaperId);
        if (this.currentWallpaper) {
            document.getElementById('modalImage').src = this.currentWallpaper.url;
            document.getElementById('wallpaperModal').classList.remove('hidden');
        }
    }

    closeModal() {
        document.getElementById('wallpaperModal').classList.add('hidden');
        this.currentWallpaper = null;
    }

    handleDownload() {
        // Check if user is authenticated
        if (!authSystem.isAuthenticated()) {
            alert('Please sign in to download wallpapers');
            return;
        }

        if (!this.currentWallpaper) return;

        // Record download in user's history
        authSystem.recordDownload(this.currentWallpaper.id);

        // Trigger download
        const link = document.createElement('a');
        link.href = this.currentWallpaper.url;
        link.download = `${this.currentWallpaper.title.replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert(`Downloaded: ${this.currentWallpaper.title}`);
        this.closeModal();
    }

    viewSource() {
        if (this.currentWallpaper) {
            alert(`Source: ${this.currentWallpaper.source}\n\nImages provided by Unsplash (unsplash.com)`);
        }
    }
}

// Global App Instance
const app = new WallpaperApp();