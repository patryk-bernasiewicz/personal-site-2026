import type { APIRoute } from 'astro';
import { buildBlogFeed } from '@/lib/feeds';

export const GET: APIRoute = () => buildBlogFeed('pl');
