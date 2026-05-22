
export interface Project {
    id: number;
    name: string;
    description?: string;
    type?: 'LANDING' | 'PLATFORM' | 'MOBILE';
    category?: string;
    features?: string[];
    image?: string;
    demoUrl?: string;
    images: string[];
}

export interface Request {
    id: number;
    name: string;
    username: string;
    requestType: 'TG' | 'VK';
    createAt: string;
}

export interface Review {
    id: number;
    name: string;
    review: string;
    rating?: number;
    createAt: string;
}

export interface RequestCreate {
    name: string;
    username: string;
    requestType: 'TG' | 'VK';
}

export interface ReviewCreate {
    name: string;
    review: string;
    rating?: number;
}

export interface AdminLogin {
    username: string;
    password: string;
}

export interface ServiceCard {
    id: string;
    title: string;
    subtitle: string;
    price?: string;
    features: {
        icon?: string;
        title: string;
        description: string;
    }[];
    examples: {
        industry: string;
        specialFeature: string;
        icon?: string;
    }[];
}