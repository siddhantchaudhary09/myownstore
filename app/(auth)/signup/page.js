import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dbConnect from "app/lib/dbConnect";
import User from "models/userModel";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = () => {
  const signup = async (formData) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) throw new Error("Please fill all fields");
    await dbConnect();
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
    await User.create({ name, email, password });

    redirect("/login");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signup} className="flex flex-col gap-4">
            <Input type="String" placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Login</Button>
          </form>

          <p>
            Dont have an account? <Link href="login">Login? </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
