import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Home() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
    //   <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
    //     <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
    //       Login
    //     </h1>
    //     <LoginForm />
    //   </div>
    // </div>
    <div className="w-full h-full">
      <Navbar color={true} />
      <LoginForm/>
    </div>
  );
}