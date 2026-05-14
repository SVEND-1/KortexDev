import type {Project, Request, Review, RequestCreate, ReviewCreate, AdminLogin} from '../types/index';

const API_BASE = 'http://localhost:8080/api';

class ApiService {
    // Projects
    async getProjects(limit: number = 8): Promise<Project[]> {
        const response = await fetch(`${API_BASE}/projects?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        return response.json();
    }

    // Requests
    async createRequest(data: RequestCreate): Promise<Request> {
        const response = await fetch(`${API_BASE}/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create request');
        return response.json();
    }

    // Reviews
    async getReviews(limit: number = 10): Promise<Review[]> {
        const response = await fetch(`${API_BASE}/reviews?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return response.json();
    }

    async createReview(data: ReviewCreate): Promise<Review> {
        const response = await fetch(`${API_BASE}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create review');
        return response.json();
    }

    // Admin
    async adminLogin(data: AdminLogin): Promise<{ success: boolean; message: string; sessionId?: string }> {
        const response = await fetch(`${API_BASE}/admin/login?username=${data.username}&password=${data.password}`, {
            method: 'POST',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }
        return response.json();
    }
}

export const api = new ApiService();