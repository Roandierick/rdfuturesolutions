import { ButtonLink, buttonClassName } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { createSignedDownloadPath, DOWNLOAD_LINK_VALIDITY_MS } from "@/lib/download-links";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Bedankt voor je aankoop",
  description:
    "Je aankoop bij RD Future Solutions is gelukt. Je ontvangt zo meteen een e-mail met je downloadlink.",
  path: "/bedankt",
});

type BedanktPageProps = {
  searchParams: {
    session_id?: string;
  };
};

type StripeCheckoutSessionResponse = {
  id: string;
  created?: number;
  customer_details?: {
    email?: string | null;
  } | null;
  customer_email?: string | null;
  metadata?: {
    slug?: string;
    ebook_title?: string;
    customer_email?: string;
  };
};

async function getCheckoutSession(sessionId: string) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY ontbreekt.");
  }

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stripe sessie ophalen mislukt: ${response.status} ${errorText}`);
  }

  return (await response.json()) as StripeCheckoutSessionResponse;
}

export default async function BedanktPage({ searchParams }: BedanktPageProps) {
  const sessionId = searchParams.session_id?.trim();

  let downloadUrl = "";
  let ebookTitle = "je ebook";
  let hasError = false;

  if (sessionId) {
    try {
      const session = await getCheckoutSession(sessionId);
      const slug = session.metadata?.slug;
      const customerEmail =
        session.customer_details?.email ??
        session.customer_email ??
        session.metadata?.customer_email ??
        "";

      ebookTitle = session.metadata?.ebook_title ?? "je ebook";

      if (!slug || !customerEmail) {
        hasError = true;
      } else {
        const expires = session.created
          ? session.created * 1000 + DOWNLOAD_LINK_VALIDITY_MS
          : Date.now() + DOWNLOAD_LINK_VALIDITY_MS;

        downloadUrl = createSignedDownloadPath({
          slug,
          email: customerEmail,
          expires,
        });
      }
    } catch (error) {
      console.error("Bedankt pagina sessie fout:", error);
      hasError = true;
    }
  } else {
    hasError = true;
  }

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
            {hasError ? (
              <>
                <p className="text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                  We konden je download niet automatisch klaarzetten. Stuur gerust een bericht via
                  de contactpagina, dan helpen we je meteen verder.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <ButtonLink href="/ebooks" size="lg">
                    Terug naar ebooks
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="secondary" size="lg">
                    Naar contact
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <p className="text-base leading-8 text-[var(--rd-text-body)] sm:text-lg">
                  Je betaling is gelukt. Je kan {ebookTitle} hieronder meteen veilig downloaden.
                  De link blijft 48 uur geldig.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href={downloadUrl} className={buttonClassName("primary", "lg")}>
                    Download je ebook
                  </a>
                  <ButtonLink href="/contact" variant="secondary" size="lg">
                    Vraag iets aan RDFS
                  </ButtonLink>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
