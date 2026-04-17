import Link from "next/link";
import { InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { SiteLogo } from "@/components/site-logo";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#0F1526] text-white">
      <div className="section-shell py-12 sm:py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="min-w-0">
            <SiteLogo dark width={140} height={40} className="w-fit" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/78 sm:text-base">
              Professionele digitale oplossingen voor Vlaanderen.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="#"
                aria-label="LinkedIn profiel van RD Future Solutions"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="#"
                aria-label="Instagram profiel van RD Future Solutions"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white"
              >
                <InstagramIcon />
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-white">Navigatie</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/78 transition hover:text-white sm:text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold text-white">Contactgegevens</h2>
            <div className="mt-5 space-y-3 text-sm text-white/78 sm:text-base">
              <p>{siteConfig.name}</p>
              <p>{siteConfig.addressDisplay}</p>
              <p>KBO: {siteConfig.kboDisplay}</p>
              <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3 hover:text-white">
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 break-all hover:text-white"
              >
                <MailIcon className="h-4 w-4" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-3 py-5 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2025 RD Future Solutions — Alle rechten voorbehouden</p>
          <p>Gebouwd voor KMO&apos;s, freelancers en ondernemers in Vlaanderen.</p>
        </div>
      </div>
    </footer>
  );
}
