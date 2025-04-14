import { signOut, auth } from "../../auth";
import styles from "./page.module.css";
import Image from "next/image";
import BgImg from "../../public/welcome-bg.jpg";

export default async function SignOutPage() {
  const session = await auth();
  return (
    <div className={styles.container}>
      <h1>My profile</h1>

      <div className={styles.profile}>
        <Image
          src={session?.user.image || BgImg}
          width={80}
          height={80}
          alt="profile"
          style={{ borderRadius: "50%" }}
        />
        <div>
          <p>{session?.user.name}</p>
          <p>{session?.user.email}</p>
        </div>
      </div>

      <div className={styles.logOut}>
        <p>Are you sure you want to log out from dashboard?</p>
        <form
          action={async (formData) => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    </div>
  );
}
