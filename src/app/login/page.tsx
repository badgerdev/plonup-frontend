import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access");

  if (access) {
    return redirect("/panel"); // lub redirect(cookieStore.get("next")?.value ?? "/panel")
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Zaloguj się</h1>
        <LoginForm />
      </div>
    </main>
  );
}
