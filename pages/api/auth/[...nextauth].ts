import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials';
import { externalApi } from '../../../apiAxios';

// import { dbUsers } from '../../../database';
import { isEmail } from '../../../utils/validations';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  
}


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'tu@correo.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
      async authorize(credentials):Promise<any> {

        try {
          
          const { data } = await externalApi.post('/login', credentials );
          
          const { ok } = data;
          
          if ( !ok ) {
            return null
          }
          
          const { usuario } = data;
          
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
      // console.log({ session, token, user });

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


});