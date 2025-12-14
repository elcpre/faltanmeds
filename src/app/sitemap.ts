
import { getActiveShortages } from '@/lib/aemps';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const shortages = await getActiveShortages();
    const baseUrl = 'https://faltanmeds.com';

    // Base routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/legal/politica-privacidad`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/legal/politica-cookies`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/legal/aviso-legal`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    // Dynamic Drug Routes
    const drugRoutes = shortages.map((drug) => ({
        url: `${baseUrl}/medicamento/${drug.cn}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    return [...routes, ...drugRoutes];
}
