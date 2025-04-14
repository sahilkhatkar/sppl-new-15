import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import credentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // console.log("Signing in with:", credentials);

        if (
          credentials.username === "admin" &&
          credentials.password === "mis@admin"
        ) {
          // console.log("Success, user authenticated");
          return {
            id: "test",
            name: "Admin User",
            email: "admin@sppl.com",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMobM3dnjg-13GqCOo9EtioNfZ-FXLiU-Ag&s",
          };
        } else return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Persist the Google Sheets API access token to the JWT token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Append the access token to the session
      session.accessToken = token.accessToken;
      return session;
    },
    
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified && profile.email.endsWith("@sainpackaging.com")||
          profile.email_verified && profile.email.endsWith("sk2061899@gmail.com")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      console.log("authenticated: ", auth);
      // redirect('/api/auth/signin');
      return !!auth;
    },
  },
  secret: process.env.AUTH_SECRET,

  pages: {
    // signIn: "/signin",
    // signOut:'/signout'
  }
});
