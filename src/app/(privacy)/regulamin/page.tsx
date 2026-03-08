import { termsOfService } from "@/lib/privacy/pivacyTexts";
import { PrivacyLayout } from "@/components/privacy/PrivacyLayout";

export const metadata = {
  title: "Regulamin | Plonup",
};

export default function TermsPage() {
  return <PrivacyLayout {...termsOfService} />;
}
