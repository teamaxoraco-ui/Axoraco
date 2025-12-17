/**
 * Shared TypeScript types for the AXRACO application
 * Centralizes common interfaces used across components
 */

// Navigation
export interface NavLink {
    name: string;
    href: string;
    color?: string;
}

// Services
export interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    className?: string;
    gradient: string;
    featured?: boolean;
    href: string;
}

// Testimonials
export interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    company: string;
    image: string;
}

// Blog
export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    author: string;
    tag: string;
    gradient: string;
    readTime: string;
    slug?: string;
}

// Jobs/Careers
export interface JobPosting {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description?: string;
}

// Case Studies
export interface CaseStudy {
    industry: string;
    title: string;
    quote: string;
    company: string;
    location: string;
    gradient: string;
}

// Contact Form
export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

// API Response
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
}

// SEO
export interface PageSEO {
    title: string;
    description: string;
    keywords?: string[];
    path: string;
}

// Component Props
export interface WithClassName {
    className?: string;
}

export interface WithChildren {
    children: React.ReactNode;
}

export interface WithClassNameAndChildren extends WithClassName, WithChildren { }
