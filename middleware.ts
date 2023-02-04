import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, res: NextResponse, event: NextFetchEvent) {
  // const cookie = req.cookies.get('token')?.value; -> si fuera un login personalizado

  //* next-auth
  //información util sobre el usuario, no uso getSession porque es recomendable usar getToken en los middlwares
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const cart = JSON.parse(req.cookies.get('cart')?.value!); //Desde el front siempre voy a mandar un array

  //Si no tiene session lo redirecciono al login si es que quiere entrar a esas rutas..
  if (!session) {
    const requestdPage = req.nextUrl.pathname; // /checkout/address o /checkout/summary
    const url = req.nextUrl.clone(); //objeto con diferente info...
    url.pathname = '/auth/login';
    url.search = `p=${requestdPage}`; // query

    return NextResponse.redirect(url);
  }
  //Si esta vacío el carrito al home
  if (cart.length === 0) {
    const url = req.nextUrl.clone(); //objeto con diferente info...
    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

//Solo se va a ejecutar el middleware si hace match con ese path.
// const regex = /^\/checkout\/(address|summary)$/;

export const config = {
  matcher: ['/checkout/address', '/checkout/summary']
};
