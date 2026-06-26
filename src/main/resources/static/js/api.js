// ===== API SERVICE =====
const API_BASE = `${API_BASE_URL}/api`;
const ADMIN_API_BASE = `${API_BASE_URL}/api/admin`;

const STORAGE_KEYS = {
    PROJECTS: 'kortex_projects',
    REQUESTS: 'kortex_requests',
    REVIEWS: 'kortex_reviews',
    AUTH: 'adminAuthenticated'
};

// ===== HELPERS =====
function getData(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ===== API SERVICE =====
const ApiService = {
    // ===== PROJECTS =====
    async getProjects(limit = 8) {
        try {
            const response = await fetch(`${API_BASE}/projects?limit=${limit}`);
            if (response.ok) {
                const data = await response.json();
                setData(STORAGE_KEYS.PROJECTS, data);
                return data;
            }
        } catch (error) {
            console.warn('Бэкенд недоступен, загружаем из localStorage:', error);
        }
        const cached = getData(STORAGE_KEYS.PROJECTS, []);
        return cached.slice(0, limit);
    },

    async getAllProjects() {
        try {
            const response = await fetch(`${API_BASE}/projects?limit=100`);
            if (response.ok) {
                const data = await response.json();
                setData(STORAGE_KEYS.PROJECTS, data);
                return data;
            }
        } catch (error) {
            console.warn('Бэкенд недоступен, загружаем из localStorage:', error);
        }
        return getData(STORAGE_KEYS.PROJECTS, []);
    },

    // ===== REQUESTS =====
    async getRequests() {
        try {
            const response = await fetch(`${ADMIN_API_BASE}/request?limit=100`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setData(STORAGE_KEYS.REQUESTS, data);
                return data;
            }
        } catch (error) {
            console.warn('Бэкенд недоступен, загружаем из localStorage:', error);
        }
        return getData(STORAGE_KEYS.REQUESTS, []);
    },

    async createRequest(data) {
        try {
            const response = await fetch(`${API_BASE}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const requests = getData(STORAGE_KEYS.REQUESTS, []);
                requests.push(result);
                setData(STORAGE_KEYS.REQUESTS, requests);
                return result;
            }
            throw new Error('Failed to create request');
        } catch (error) {
            console.error('Error creating request:', error);
            throw error;
        }
    },

    // ===== REVIEWS =====
    async getReviews(limit = 10) {
        try {
            const response = await fetch(`${API_BASE}/reviews?limit=${limit}`);
            if (response.ok) {
                const data = await response.json();
                setData(STORAGE_KEYS.REVIEWS, data);
                return data;
            }
        } catch (error) {
            console.warn('Бэкенд недоступен, загружаем из localStorage:', error);
        }
        return getData(STORAGE_KEYS.REVIEWS, []);
    },

    async createReview(data) {
        try {
            const response = await fetch(`${API_BASE}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const reviews = getData(STORAGE_KEYS.REVIEWS, []);
                reviews.push(result);
                setData(STORAGE_KEYS.REVIEWS, reviews);
                return result;
            }
            throw new Error('Failed to create review');
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    },

    // ===== AUTH =====
    isAuthenticated() {
        return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    },

    async login(username, password) {
        try {
            const response = await fetch(`${ADMIN_API_BASE}/login?username=${username}&password=${password}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                let errorMessage = 'Login failed';
                try {
                    const error = await response.json();
                    errorMessage = error.error || error.message || 'Login failed';
                } catch {}
                throw new Error(errorMessage);
            }

            const data = await response.json();
            if (data.success) {
                localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
};

// ===== EXPORTS =====
window.ApiService = ApiService;