import { auth } from "auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return <div>{session ? <div></div> : <div>Not logged in</div>}</div>;
}
