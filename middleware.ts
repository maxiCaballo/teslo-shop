import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, res: NextResponse, event: NextFetchEvent) {
  // const cookie = req.cookies.get('token')?.value; -> si fuera un login personalizado

  //* next-auth
  //información util sobre el usuario
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  //Si no tiene session lo redirecciono al login si es que quiere entrar a esas rutas..
  if (!session) {
    const requestdPage = req.nextUrl.pathname; // /checkout/address o /checkout/summary
    const url = req.nextUrl.clone(); //objeto con diferente info...
    url.pathname = '/auth/login';
    url.search = `p=${requestdPage}`; // query

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

//Solo se va a ejecutar el middleware si hace match con ese path.
export const config = {
  matcher: ['/checkout/address', '/checkout/summary']
};
