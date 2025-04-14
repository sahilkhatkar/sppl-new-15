import { signIn, auth } from "../../auth";
import React from "react";
import styles from "./page.module.css";
import { FcGoogle, FaFacebook } from "react-icons/fc";
import Image from "next/image";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
// import IMG from "../../../public/welcome-bg.jpg";

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwSgNq3qiJXa9qdvQ2c3vwBDqEGbm27fgHX82OFrCDdoyqQDCCGV-BQ979_MKJtJMW-/exec";

export default async function SignIn() {
  const session = await auth();
  console.log("Session:", session);

  const handleSubmit = async () => {
    let formData = new FormData();

    {
      formData.append("Session", session);
      formData.append("Expiry", session.expires);
      formData.append("Name", session.user.name);
      formData.append("Email", session.user.email);
      formData.append("Image", session.user.image);

      // Display the key/value pairs
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], ":", pair[1]);
      // }

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      }).catch((error) => console.error("Error!", error.message));

      console.log("response: ", response);

      let finalStatus = "An error occured";
      if (response.status === 200) finalStatus = "Form filled successfully";
    }
  };

  return (
    <>
      <section>
        <div className={styles.formContainer}>
          <h1>SPPL</h1>
          <h2>Dashboard Login</h2>
          <p>Hey, Enter your details to get sign in to your account</p>

          <form
            // action={async (formData) => {
            //   "use server";

            //   console.log("form:", formData);

            //   // await 
            //   signIn("credentials", formData,);
            // }}
            className={styles.signInForm}
          >
            <div className={styles.jobInput}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder=""
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className={styles.jobInput}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder=""
              />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" value="Sign In">
              Sign in
            </button>
          </form>
          <p>Or</p>

          <div className={styles.signInbuttons}>
            <form
              action={async () => {
                "use server";
                await signIn(
                  "google",
                   { redirectTo: "/", redirect: true }
                );
              }}
            >
              <button type="submit">
                <FcGoogle /> Google
              </button>
            </form>

            {/* <button><FaFacebook /> Facebook</button> */}
          </div>
        </div>
      </section>
    </>
  );
}

// 'use client';

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import styles from './page.module.css'; // Import your CSS Module

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await signIn('email', { email, redirect: false });
//     if (result?.error) {
//       setError(result.error);
//     } else {
//       window.location.href = '/';
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Welcome Back</h1>
//       {error && <p className={styles.error}>{error}</p>}
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email Address"
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
