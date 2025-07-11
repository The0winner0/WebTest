// /app/api/revalidate/route.js

import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
export async function POST(request) {
  console.log('Received a revalidation request...');

  const secret = request.headers.get('x-revalidation-token');
  if(secret === null) {
    console.error('No secret token provided in the request headers.');
    return NextResponse.json({ message: 'Missing secret token' }, { status: 401 });
  }
  if(!process.env.STRAPI_WEBHOOK_SECRET) {
    console.error('Environment variable STRAPI_WEBHOOK_SECRET is not defined.');
    return NextResponse.json({ message: 'Missing STRAPI_WEBHOOK_SECRET' }, { status: 500 });
  }
  if (secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    console.error('Invalid secret token.');
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

//   const body = await request.json();

//   // 2. Log the entire body to the console
//   console.log('Full request body from Strapi:', body);
//   const model = body.model;

//   if (model === 'atoll-blog') {
//     try {
//       revalidateTag('atoll-blogs');
//       console.log("Successfully revalidated tag: 'atoll-blogs'");
//       return NextResponse.json({ revalidated: true, now: Date.now() });
//     } catch (err) {
//       console.error('Error revalidating tag:', err);
//       return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
//     }
//   }

  const body = await request.json();
  let revalidated = false;
  let message = "Model not matched.";

  try {
    if (body.model === 'atoll-blog') {
      revalidateTag('atoll-blogs');
      message = "Revalidated atoll-blogs";
      revalidated = true;
    } else if (body.model === 'gallery-image') {
      revalidateTag('gallery-images');
      message = "Revalidated gallery-images";
      revalidated = true;
    }
    else if (body.model === 'atoll-product' || body.model === 'atoll-product-page') {
      revalidateTag('products');
      message = `Revalidated products due to change in ${body.model}`;
      revalidated = true;
    }
  } catch (err) {
    console.error('Error during revalidation:', err);
    message = "Revalidation failed.";
    revalidated = false;
  }

  return NextResponse.json({ revalidated, message, now: Date.now() });
}