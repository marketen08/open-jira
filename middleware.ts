// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const session:any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Unicamente chequeo si existe la session, 
    // No se chequeaa el token ya que lo esta haciendo el AuthProvider, y si no existe token hace un logout
    // Tampoco es necesario usar el !startsWith('/login') porque la pagina de login no esta dentro del las que evalua el middleware
    
    if ( !session ) {
        const requestedPage = req.nextUrl.pathname;
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`;
        url.search = `callbackUrl=${requestedPage}`;
        return NextResponse.redirect(url);
    }

    if ( req.nextUrl.pathname.startsWith( '/api/entries/' )) {
        const id = req.nextUrl.pathname.replace('/api/entries/', '');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        
        if ( !checkMongoIDRegExp.test( id )) {
            const url = req.nextUrl.clone();
            url.pathname = '/api/bad-request';
            url.search = `?message=${ id } is not a valid MongoID`;

            return NextResponse.rewrite(url);

        }
    }

    if ( req.nextUrl.pathname.startsWith( '/clientes' )) {

        const validRoles = [ 'admin', 'super-admin' ];
        if ( !validRoles.includes( session.user?.rol ) ) {
            const url = req.nextUrl.clone();
            url.pathname = `/`;
            url.search = '';
            return NextResponse.redirect(url);
        }
    }


    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
    matcher: [
        '/api/entries',
        '/api/entries/:path*',
        '/chat',
        '/chat/:path*',
        '/clientes',
        '/clientes/:path*',
        '/ingreso',
        '/pedidos',
        '/pedidos/:path*',
        '/vehiculos',
        '/vehiculos/:path*',
        '/',
    ]
}