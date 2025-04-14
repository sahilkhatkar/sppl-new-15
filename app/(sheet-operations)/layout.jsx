import Sidemenu from "../../components/Sidemenu";
import Navbar from "../../components/AddPONavbar";

export default async function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
