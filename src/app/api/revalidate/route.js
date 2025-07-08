// /app/api/revalidate/route.js

import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  // 1. Verify the secret token
  if (secret !== process.env.STRAPI_REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // 2. We don't need to parse the body, just revalidate all Strapi content
  try {
    revalidateTag('strapi');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}