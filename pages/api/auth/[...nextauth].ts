import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
//Para enlazarlo con mi propia authenticacion o con los usuarios que se registren desde mi app...
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '@/database';

declare module 'next-auth' {
  interface Session {
    accessToken?: any;
    user?: any;
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: '',
      //Expongo los inputs que necesite para authenticar el usuario
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@....' },
        password: { label: 'Password', type: 'password', placeholder: 'password...' }
      },
      //Método que authoriza o no el usuario en funcion de sus credenciales
      async authorize(credentials) {
        // Props: id, email, name son necesarias sinó tira error...
        const user = await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
        if (!user) return null;

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
    // ...add more providers here

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],

  callbacks: {
    //? el token viene undefined
    async jwt({ token, account, user }) {
      if (account) {
        token.accesToken = account.access_token;

        switch (account.type) {
          case 'credentials':
            token.user = user;

            break;

          case 'oauth':
            //todo: guardar usuario o verificar si existe en db
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      //? el token viene undefined
      session.accessToken = token.accessToken;
      session.user = token.user;
      console.log('Desde session: ', session);
      return session;
    }
  }
});

//*Callbacks
//En los callbacks creo funciones que van a definir como quiero que se firmen los jwt, que payload y
//firma voy a grabar en los tokens, que info va a fluir en la sesión y si se usa autenticacion es de
//3ros grabarlos en db en caso de que no existan.

// jwt({token,account,user})------> Cuando se genere un nuevo token que quiero hacer...
// El account tengo acceso al type: que es que tipo de autenticacion esta usando el usuario, si es
// "outh" es que esta usando autenticacion de 3ros si es "credentials" no.
// El user recibo los datos del usuario, solo si es por 'credentials' sinó está undefined.

//session({session,token,user})--> Cuando se genere un nueva sesion que quiero hacer...
//Acá el user existe pero dentro del objeto session, el user que desestructuro esta undefined si es
//que eligió autenticacion de 3ros
