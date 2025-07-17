import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('Received a revalidation request...');

  const secret = request.headers.get('x-revalidation-token');
  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  let revalidated = false;
  let message = "Model not matched.";

  try {
    if (body.model === 'homepage') {
      revalidateTag('homepage');
      message = "Revalidated homepage";
      revalidated = true;
    } else if (body.model === 'atoll-blog') {
      revalidateTag('atoll-blogs');
      message = "Revalidated atoll-blogs";
      revalidated = true;
    } else if (body.model === 'gallery-image') {
      revalidateTag('gallery-images');
      message = "Revalidated gallery-images";
      revalidated = true;
    } else if (body.model === 'atoll-product' || body.model === 'atoll-product-page') {
      revalidateTag('products');
      message = `Revalidated products due to change in ${body.model}`;
      revalidated = true;
    }
  } catch (err) {
    console.error('Error during revalidation:', err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }

  return NextResponse.json({ revalidated, message, now: Date.now() });
}