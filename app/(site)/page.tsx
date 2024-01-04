import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:w-full sm:max-w-md sm:mx-auto">
        <Image
          src={"/images/logo.png"}
          alt="messenger logo"
          height={48}
          width={48}
          className="mx-auto w-auto"
        />
        <h2 className="text-center mt-6 font-bold text-gray-900 tracking-tight text-3xl">
          Sign in your account
        </h2>
      </div>
      {/* AuthForm */}
      <AuthForm />
    </div>
  );
}
