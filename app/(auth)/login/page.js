import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dbConnect from "app/lib/dbConnect";
import { signIn } from "auth";
import Link from "next/link";

const page = () => {
  const loginhandler = async (formData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) throw new Error("Please fill all fields");
    await dbConnect();
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      return error.message;
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginhandler} className="flex flex-col gap-4">
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Login</Button>
          </form>

          <p>
            Dont have an account? <Link href="signup">Sign up? </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
