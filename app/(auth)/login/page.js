import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "src/components/client/LoginForm";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />

          <p>
            Dont have an account? <Link href="signup">Sign up? </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
