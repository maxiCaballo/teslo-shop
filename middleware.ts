import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextURL } from 'next/dist/server/web/next-url';

//*Roles
const roles = ['client', 'admin'];
const adminRoles = ['admin', 'SEO', 'super-user'];

//*Utils
function redirectToUrl(url: NextURL, to: string = '') {
  const newURL = url.clone();
  newURL.pathname = to;
  return newURL;
}

export async function middleware(req: NextRequest, res: NextResponse, event: NextFetchEvent) {
  // const cookie = req.cookies.get('token')?.value; -> si fuera un login personalizado
  //información util sobre el usuario, no uso getSession porque es recomendable usar getToken en los middlwares
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); //next-auth
  const path = req.nextUrl.pathname;

  //* Logica para rutas Api Admin
  if (path.includes('/api/admin/')) {
    if (!session) {
      return new Response(JSON.stringify({ message: 'Not authorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!adminRoles.includes(session.user.role)) {
      const url = redirectToUrl(req.nextUrl, '/');
      return NextResponse.redirect(url);
    }
  }

  const cart = JSON.parse(req.cookies.get('cart')?.value!); //Desde el front siempre voy a mandar un array

  //Si no tiene session lo redirecciono al login si es que quiere entrar a esas rutas..
  if (!session) {
    const requestdPage = req.nextUrl.pathname; // /checkout/address o /checkout/summary
    const url = redirectToUrl(req.nextUrl, '/auth/login'); //objeto con diferente info...
    url.search = `p=${requestdPage}`; // query
    return NextResponse.redirect(url);
  }

  //*Logica para rutas admin
  if (path.startsWith('/admin/')) {
    if (!adminRoles.includes(session.user.role)) {
      const url = redirectToUrl(req.nextUrl, '/');
      return NextResponse.redirect(url);
    }
  }

  //*Logica para rutas client
  if (path.includes('/summary')) {
    if (cart.length === 0) {
      const url = redirectToUrl(req.nextUrl, '/');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

//Solo se va a ejecutar el middleware si hace match con ese path.
// const regex = /^\/checkout\/(address|summary)$/;

export const config = {
  matcher: ['/checkout/address', '/checkout/summary', '/api/admin/:path*', '/admin/:path*']
};
