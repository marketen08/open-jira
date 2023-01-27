import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { isEmail } from '../../../utils/validations';
import { externalApiSinTocken } from '../../../apiAxios';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  
}



type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    // Configure one or more authentication providers
    providers: [
      Credentials({
        name: 'Custom Login',
        credentials: {
          email: { label: 'Correo:', type: 'email', placeholder: 'tu@correo.com'  },
          password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
        },
        async authorize(credentials):Promise<any> {

          try {
            
            const { data } = await externalApiSinTocken.post('/login', credentials );
            
            const { ok } = data;
            
            if ( !ok ) {
              return null
            }
            
            const { usuario } = data;
            res.setHeader('Set-Cookie', `${'token'}=${ data.token }; path=/`)

            // EL SIGUIENTE CODIGO NO FUNCIONA
            // Usando serialize no me permite acceder a eliminar la cookie, debe haber algun cambio en el nombre con el que la esta guardando
            // res.setHeader("Set-Cookie", cookie.serialize( 'token', data.token, {
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV !== 'development',
            //   maxAge: 60 * 60,
            //   sameSite: 'strict',
            //   path: '/',
            // } ))

            const user = { 
              ...usuario,
              token: data.token
            }
            
            return user;

          } catch (error) {
            console.log(error);
            return null
          }
        }
      }),

      // GithubProvider({
      //   clientId: process.env.GITHUB_ID as string,
      //   clientSecret: process.env.GITHUB_SECRET as string,
      // }),

      // GoogleProvider({
      //   clientId: process.env.GOOGLE_ID as string,
      //   clientSecret: process.env.GOOGLE_SECRET as string
      // })
    

    ],

    callbacks: {
      async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth': 
            // TODO: ACTIVAR ESTA LINEA PARA USAR AUTENTICACION POR REDES SOCIALES
            // token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          break;

          case 'credentials':
            token.user = user;
          break;
        }
      }

      return token;
    },


    async session({ session, token, user }){
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;

      return session;
    }

    },

    // Custom Pages
    pages: {
    signIn: '/auth/login',
    // newUser: '/auth/register'
    },

    // session: {
    //   maxAge: 2592000, /// 30d
    //   strategy: 'jwt',
    //   updateAge: 86400, // cada día
    // },

}}

export default (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}
