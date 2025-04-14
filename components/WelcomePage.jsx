import React from "react";
import styles from "./welcome.module.css";
import { FcGoogle, FaFacebook } from "react-icons/fc";
import { signIn } from "@/auth";

export default function WelcomePage() {
  return (
    <>
      <section>
        <div className={styles.formContainer}>
          <h1>Dashboard Login</h1>
          <p>Hey, Enter your details to get sign in to your account</p>

          <form action="" className={styles.signInForm}>
            <div className={styles.jobInput}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder=""
                // value={formState.remarks}
                // onChange={(e) =>
                //   setFormState((res) => ({
                //     ...res,
                //     remarks: e.target.value,
                //   }))
                // }
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className={styles.jobInput}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder=""
                // value={formState.remarks}
                // onChange={(e) =>
                //   setFormState((res) => ({
                //     ...res,
                //     remarks: e.target.value,
                //   }))
                // }
              />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit">Sign in</button>
          </form>
          <p> Or Sign in with</p>

          <div>
            <form
              action={async (formData) => {
                "use server";
                await signIn("google");
              }}
            >
              <button>
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
