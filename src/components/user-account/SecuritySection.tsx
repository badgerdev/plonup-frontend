import ChangePasswordForm from "@/components/user-account/ChangePasswordForm";

export default function SecuritySection() {
  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Bezpieczeństwo</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Zmień hasło do swojego konta.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
