
import { searchDrugs } from '@/lib/aemps';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json([]);
    }

    const results = await searchDrugs(query);
    return NextResponse.json(results);
}
