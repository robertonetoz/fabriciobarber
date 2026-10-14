import Image from "next/image";
import { brand, navLinks, units } from "@/data/site";
import { waLink } from "@/lib/utils";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { SignHeading } from "./Reveal";

export default function Footer() {
  const main = units[0];
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pole-stripes animate-pole h-2 w-full opacity-80" />

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SignHeading lines={["Bora dar aquele", "tapa no visual?"]} className="text-[clamp(2.8rem,7vw,6rem)] text-bone" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#agendar" className="btn-brass text-base">Agendar horário</a>
            <a href={waLink(main.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-ghost text-base">
              <WhatsAppIcon className="size-5 text-brass" /> {main.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/images/logo-crop.png" alt="Fabrício Pereira Barber Club" width={397} height={121} className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
              Barbearia em Araguari – MG. Corte, barba, sobrancelha na navalha e cortes infantis.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="text-sm text-bone">Navegue</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-steel">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-brass">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {units.map((u) => (
            <div key={u.id}>
              <h3 className="text-sm text-bone">{u.name}</h3>
              <address className="mt-4 space-y-1.5 text-sm not-italic leading-relaxed text-steel">
                <p>{u.street}, {u.district}</p>
                <p>{u.cityLine}</p>
                <p>
                  <a href={`tel:+${u.whatsapp}`} className="hover:text-brass">{u.phoneDisplay}</a>
                </p>
              </address>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.name}. Todos os direitos reservados.</p>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-steel hover:text-brass">
            <InstagramIcon className="size-4" /> {brand.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}
