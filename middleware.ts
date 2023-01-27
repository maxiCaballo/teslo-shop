import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse, event: NextFetchEvent) {
  const cookie = req.cookies.get('token')?.value;
  const country = req.cookies.get('country')?.value;

  console.log('middleware', country);

  const response = NextResponse.next();
  return response;
  // return new Response('Token: ' + cookie);
}

//Solo se va a ejecutar el middleware si hace match con ese path.
export const config = {
  matcher: ['/checkout/address', '/checkout/summary']
};
