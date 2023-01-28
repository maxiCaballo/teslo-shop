import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
//Para enlazarlo con mi propia authenticacion o con los usuarios que se registren desde mi app...
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: '',
      //Expongo los inputs que necesite para authenticar el usuario
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@....' },
        password: { label: 'Password', type: 'password', placeholder: 'password...' }
      },
      async authorize(credentials) {
        console.log({ credentials });
        //Todo: validar en db..
        return null;
      }
    }),

    // ...add more providers here

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  //Callbacks:
  //Espeficio como quiero que se firmen los jwt, que data voy a grabar en los tokens que info va a
  //fluir en la sesión y si se usa autenticacion de 3ros grabarlos en db.
  callbacks: {}
};
export default NextAuth(authOptions);
