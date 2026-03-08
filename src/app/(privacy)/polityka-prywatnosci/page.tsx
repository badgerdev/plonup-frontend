import { privacyPolicy } from "@/lib/privacy/pivacyTexts";
import { PrivacyLayout } from "@/components/privacy/PrivacyLayout";

export const metadata = {
  title: "Polityka prywatności | Plonup",
};

export default function PrivacyPolicyPage() {
  return <PrivacyLayout {...privacyPolicy} />;
}
