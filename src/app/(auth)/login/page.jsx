import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = {
   title: "Login",
   description: "Sign in to your SunCart account.",
};
const LoginPage = () => {
   return (
      <Suspense fallback={<p>Loading login...</p>}>
         <LoginForm />
      </Suspense>
   );
};

export default LoginPage;
