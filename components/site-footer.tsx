import Link from "next/link";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { SiteLogo } from "@/components/site-logo";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--rd-black)] text-white">
      <div className="section-shell py-14 md:py-16">
        <div className="grid gap-12 border-t border-white/10 pt-10 md:grid-cols-2 xl:grid-cols-[1.15fr_0.8fr_1fr]">
          <div className="min-w-0">
            <SiteLogo dark className="w-fit" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/72 sm:text-base">
              Professionele digitale oplossingen voor Vlaanderen.
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/58 sm:text-base">
              {siteConfig.name} {"\u00b7"} {siteConfig.city}, {siteConfig.region} {"\u00b7"} KBO{" "}
              {siteConfig.kboDisplay} {"\u00b7"} {siteConfig.phoneDisplay} {"\u00b7"}{" "}
              {siteConfig.email}
            </p>
          </div>

          <div className="min-w-0">
            <p className="mono-label text-white/55">Navigatie</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/72 transition hover:text-white sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 md:col-span-2 xl:col-span-1">
            <p className="mono-label text-white/55">Contact</p>
            <div className="mt-5 space-y-4 text-sm text-white/72 sm:text-base">
              <p>{siteConfig.name}</p>
              <p>
                {siteConfig.city}, {siteConfig.region}
              </p>
              <p>KBO {siteConfig.kboDisplay}</p>
              <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3 hover:text-white">
                <PhoneIcon className="mt-1 h-4 w-4 flex-none" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 break-all hover:text-white"
              >
                <MailIcon className="mt-1 h-4 w-4 flex-none" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="section-shell flex flex-col gap-3 py-5 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
          <p>{"\u00a9"} 2026 RD Future Solutions. Alle rechten voorbehouden.</p>
          <p>KBO {siteConfig.kboDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
