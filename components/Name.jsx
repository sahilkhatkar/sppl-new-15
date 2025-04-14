import { auth } from "../auth";

export default async function SignOutPage() {
  const session = await auth();
  return <p>{session?.user.name.split(" ")[0]}</p>;
}
