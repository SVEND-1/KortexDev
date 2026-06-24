import type { Project, Review, Request } from '../../types';

const API_BASE = 'http://localhost:8080/api/admin';

class AdminApiService {
    isAuthenticated(): boolean {
        return localStorage.getItem('adminAuthenticated') === 'true';
    }

    async login(username: string, password: string): Promise<{ success: boolean; sessionId?: string }> {
        const response = await fetch(`${API_BASE}/login?username=${username}&password=${password}`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            let errorMessage = 'Login failed';
            try {
                const error = await response.json();
                errorMessage = error.error || error.message || 'Login failed';
            } catch (e) {}
            throw new Error(errorMessage);
        }

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('adminAuthenticated', 'true');
        }
        return data;
    }

    logout(): void {
        localStorage.removeItem('adminAuthenticated');
    }

    async getProjects(): Promise<Project[]> {
        try {
            const response = await fetch(`${API_BASE}/project?limit=100`, {
                credentials: 'include',
            });

            if (!response.ok) {
                console.error('Projects response status:', response.status);
                return [];
            }

            const data = await response.json();
            console.log('Projects loaded:', data);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error loading projects:', error);
            return [];
        }
    }

    async createProject(name: string, images: FileList | null): Promise<Project | null> {
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (images && images.length > 0) {
                Array.from(images).forEach(file => {
                    formData.append('images', file);
                });
            }

            const response = await fetch(`${API_BASE}/project`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Create project error:', errorText);
                throw new Error(`Failed to create project: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    async deleteProject(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE}/project/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete project: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }

    async getRequests(): Promise<Request[]> {
        try {
            const response = await fetch(`${API_BASE}/request?limit=100`, {
                credentials: 'include',
            });

            if (!response.ok) {
                return [];
            }

            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error loading requests:', error);
            return [];
        }
    }

    async deleteRequest(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE}/request/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete request: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting request:', error);
            throw error;
        }
    }

    async getReviews(): Promise<Review[]> {
        try {
            const response = await fetch(`${API_BASE}/reviews?limit=100`, {
                credentials: 'include',
            });

            if (!response.ok) {
                return [];
            }

            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error loading reviews:', error);
            return [];
        }
    }

    async deleteReview(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE}/reviews/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete review: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    }
}

export const adminApi = new AdminApiService();