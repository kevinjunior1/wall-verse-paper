// Authentication System

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Sign In/Sign Up Toggle
        document.getElementById('signInBtn').addEventListener('click', () => this.showSignIn());
        document.getElementById('signUpBtn').addEventListener('click', () => this.showSignUp());

        // Form Submissions
        document.getElementById('signInForm').addEventListener('submit', (e) => this.handleSignIn(e));
        document.getElementById('signUpForm').addEventListener('submit', (e) => this.handleSignUp(e));

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
    }

    showSignIn() {
        document.getElementById('signInBtn').classList.add('active');
        document.getElementById('signUpBtn').classList.remove('active');
        document.getElementById('signInForm').classList.add('active');
        document.getElementById('signUpForm').classList.remove('active');
    }

    showSignUp() {
        document.getElementById('signUpBtn').classList.add('active');
        document.getElementById('signInBtn').classList.remove('active');
        document.getElementById('signUpForm').classList.add('active');
        document.getElementById('signInForm').classList.remove('active');
    }

    handleSignUp(e) {
        e.preventDefault();

        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirm').value;

        // Validation
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (this.users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        // Create User
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            downloads: []
        };

        this.users.push(user);
        this.saveUsers();
        alert('Account created successfully! Please sign in.');
        this.showSignIn();
        document.getElementById('signUpForm').reset();
    }

    handleSignIn(e) {
        e.preventDefault();

        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Invalid email or password');
            return;
        }

        this.currentUser = user;
        this.saveSession();
        this.showApp();
        document.getElementById('signInForm').reset();
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            this.currentUser = null;
            localStorage.removeItem('wallVerseSession');
            this.showAuth();
            document.getElementById('signInForm').reset();
            document.getElementById('signUpForm').reset();
        }
    }

    showAuth() {
        document.getElementById('authContainer').classList.remove('hidden');
        document.getElementById('appContainer').classList.add('hidden');
    }

    showApp() {
        document.getElementById('authContainer').classList.add('hidden');
        document.getElementById('appContainer').classList.remove('hidden');
        this.updateUserGreeting();
    }

    updateUserGreeting() {
        if (this.currentUser) {
            const firstName = this.currentUser.name.split(' ')[0];
            document.getElementById('userGreeting').textContent = `Welcome, ${firstName}! 👋`;
        }
    }

    checkExistingSession() {
        const session = localStorage.getItem('wallVerseSession');
        if (session) {
            try {
                const user = JSON.parse(session);
                const foundUser = this.users.find(u => u.id === user.id);
                if (foundUser) {
                    this.currentUser = foundUser;
                    this.showApp();
                } else {
                    this.showAuth();
                }
            } catch (e) {
                this.showAuth();
            }
        } else {
            this.showAuth();
        }
    }

    saveSession() {
        const sessionData = {
            id: this.currentUser.id,
            name: this.currentUser.name,
            email: this.currentUser.email
        };
        localStorage.setItem('wallVerseSession', JSON.stringify(sessionData));
    }

    loadUsers() {
        const data = localStorage.getItem('wallVerseUsers');
        return data ? JSON.parse(data) : [];
    }

    saveUsers() {
        localStorage.setItem('wallVerseUsers', JSON.stringify(this.users));
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    recordDownload(wallpaperId) {
        if (this.currentUser) {
            if (!this.currentUser.downloads) {
                this.currentUser.downloads = [];
            }
            this.currentUser.downloads.push({
                id: wallpaperId,
                downloadedAt: new Date().toISOString()
            });
            this.saveUsers();
            this.saveSession();
        }
    }
}

// Global Authentication Instance
const authSystem = new AuthSystem();

// Helper function for forms
function toggleForms() {
    document.getElementById('signInBtn').classList.toggle('active');
    document.getElementById('signUpBtn').classList.toggle('active');
    document.getElementById('signInForm').classList.toggle('active');
    document.getElementById('signUpForm').classList.toggle('active');
}