import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Bedankt voor je aankoop",
  description:
    "Je aankoop bij RD Future Solutions is gelukt. Je ontvangt zo meteen een e-mail met je downloadlink.",
  path: "/bedankt",
});

export default function BedanktPage() {
  return (
    <>
      <PageHero
        eyebrow="Bedankt"
        title="Bedankt voor je aankoop!"
        description="Je ontvangt zo meteen een e-mail met je downloadlink. Controleer ook je spamfolder."
      />

      <section className="section-space pt-4">
        <div className="section-shell">
          <div className="rd-card max-w-3xl border-l-[3px] border-l-[var(--rd-blue)] p-6 sm:p-8">
            <p className="text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
              Je betaling is gelukt. Zodra Stripe de aankoop bevestigt, sturen we automatisch je
              downloadlink door per e-mail.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/ebooks" size="lg">
                Terug naar ebooks
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Naar contact
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
