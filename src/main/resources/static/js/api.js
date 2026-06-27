// ===== API SERVICE =====
const API_BASE = `${API_BASE_URL}/api`;
const ADMIN_API_BASE = `${API_BASE_URL}/api/admin`;

const ApiService = {
    // ===== PROJECTS =====
    async getProjects(limit = 8) {
        const response = await fetch(`${API_BASE}/projects?limit=${limit}`);
        if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
        return await response.json();
    },

    async getAllProjects() {
        const response = await fetch(`${API_BASE}/projects?limit=100`);
        if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
        return await response.json();
    },

    // ===== REQUESTS =====
    async getRequests(limit = 100) {
        const response = await fetch(`${ADMIN_API_BASE}/request?limit=${limit}`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to load requests: ${response.status}`);
        return await response.json();
    },

    async createRequest(data) {
        const response = await fetch(`${API_BASE}/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to create request: ${response.status}`);
        return await response.json();
    },

    // ===== REVIEWS =====
    async getReviews(limit = 10) {
        const response = await fetch(`${API_BASE}/reviews?limit=${limit}`);
        if (!response.ok) throw new Error(`Failed to load reviews: ${response.status}`);
        return await response.json();
    },

    async createReview(data) {
        const response = await fetch(`${API_BASE}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Failed to create review: ${response.status}`);
        return await response.json();
    },

    // ===== AUTH =====
    // Проверяем сессию через защищённый эндпоинт GET /api/admin/project
    async checkAuth() {
        try {
            const response = await fetch(`${ADMIN_API_BASE}/project?limit=1`, {
                credentials: 'include',
            });
            return response.ok;
        } catch {
            return false;
        }
    },

    async login(username, password) {
        const response = await fetch(
            `${ADMIN_API_BASE}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!response.ok) {
            let errorMessage = 'Неверный логин или пароль';
            try {
                const error = await response.json();
                errorMessage = error.error || error.message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
        }

        return await response.json();
    },

    // ===== ADMIN: PROJECTS =====
    async adminGetProjects(limit = 100) {
        const response = await fetch(`${ADMIN_API_BASE}/project?limit=${limit}`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
        return await response.json();
    },

    async createProject(name, images) {
        const formData = new FormData();
        formData.append('name', name);
        if (images && images.length > 0) {
            Array.from(images).forEach(file => formData.append('images', file));
        }
        const response = await fetch(`${ADMIN_API_BASE}/project`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create project: ${response.status} - ${errorText}`);
        }
        return await response.json();
    },

    async deleteProject(id) {
        const response = await fetch(`${ADMIN_API_BASE}/project/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to delete project: ${response.status}`);
        return true;
    },

    // ===== ADMIN: REQUESTS =====
    async adminGetRequests(limit = 100) {
        const response = await fetch(`${ADMIN_API_BASE}/request?limit=${limit}`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to load requests: ${response.status}`);
        return await response.json();
    },

    async deleteRequest(id) {
        const response = await fetch(`${ADMIN_API_BASE}/request/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to delete request: ${response.status}`);
        return true;
    },

    // ===== ADMIN: REVIEWS =====
    async adminGetReviews(limit = 100) {
        const response = await fetch(`${ADMIN_API_BASE}/reviews?limit=${limit}`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to load reviews: ${response.status}`);
        return await response.json();
    },

    async deleteReview(id) {
        const response = await fetch(`${ADMIN_API_BASE}/reviews/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`Failed to delete review: ${response.status}`);
        return true;
    },
};

window.ApiService = ApiService;
