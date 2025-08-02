import Link from "next/link"

export default function FooterServices() {
  const servicesLinks = [
    { href: "/page/about", label: "About" },
    { href: "/page/faq", label: "Faq" },
    { href: "/page/contact", label: "Contact" },
  ]

  return (
    <>
      <h4 className="bold mb-15">Services</h4>
      {servicesLinks.map((link) => (
        <Link key={link.href} href={link.href} className="block mb-2 text-gray-600 hover:text-gray-800 transition-colors">
          {link.label}
        </Link>
      ))}
    </>
  )
} 