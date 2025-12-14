
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
