// import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";
// import '../../../loading'
import styles from "./page.module.css";
import SignOutBtn from "./signOutBtn";
import Sidemenu from "../../../../components/Sidemenu";

export default async function SignOutPage() {
  // const session = await auth();
  // console.log(session);
  // const date = new Date(session?.expires);
  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true, // Use 12-hour format
  // };

  return (
    <>
      {/* <h1>Expiry time: {date.toLocaleString("en-US")}</h1> */}
      {/* <div className="layoutRightDivSignin"> */}
      {/* </div> */}
      {/* <Sidemenu /> */}
      <div className="layoutRightDiv">
        <SignOutBtn />
      </div>
    </>
  );
}

// export const metadata = {
//   generator: "Next.js",
//   applicationName: "Next.js",
//   referrer: "origin-when-cross-origin",
//   keywords: ["Sain Packaging", "Dashboard", "Job Dashboard"],
//   authors: [
//     { name: "Sahil" },
//     { name: "Sahil", url: "https://www.sainpackaging.com" },
//   ],
//   creator: "Sahil Kumar",
//   publisher: "Sain Packaging Private Limited",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
// };
