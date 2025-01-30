import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignupForm from "src/components/client/SignupForm";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />

          <p>
            Dont have an account? <Link href="login">Login? </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
