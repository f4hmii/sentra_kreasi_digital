/// <reference types="vite/client" />
// src/services/cmsApi.ts

const API_BASE_URL = import.meta.env.VITE_CMS_API_URL;
const API_KEY = import.meta.env.VITE_CMS_API_KEY;

export interface CmsContentBlock {
  id: string;
  type: string;
  data: any;
}

export interface CmsPost {
  id: number;
  tenant_id?: number;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content: any;
  status: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author_id?: number | null;
}

export interface CmsPage {
  id: number;
  tenant_id?: number;
  title: string;
  slug: string;
  content: CmsContentBlock[];
  status: string;
  created_at: string;
  updated_at: string;
  author_id?: number | null;
  is_in_navbar?: number;
  priority?: number;
}

export const fetchPosts = async (): Promise<CmsPost[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Gagal mengambil data posts:", error);
    throw error;
  }
};

export const fetchPages = async (): Promise<CmsPage[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Gagal mengambil data pages:", error);
    throw error;
  }
};

export const fetchSettings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Gagal mengambil data settings:", error);
    throw error;
  }
};
