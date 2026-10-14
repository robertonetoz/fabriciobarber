import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Course from "@/components/Course";
import Reviews from "@/components/Reviews";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import FloatingUI from "@/components/FloatingUI";
import { brand, units } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: brand.name,
  image: "/images/logo.png",
  telephone: "+55 34 99647-9537",
  sameAs: [brand.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: units[0].street,
    addressLocality: "Araguari",
    addressRegion: "MG",
    postalCode: "38440-060",
    addressCountry: "BR",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: brand.reviewsCount },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "13:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "08:00", closes: "20:00" },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Booking />
        <Course />
        <Reviews />
        <Locations />
      </main>
      <Footer />
      <FloatingUI />
    </>
  );
}
