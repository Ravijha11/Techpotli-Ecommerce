import Link from "next/link"

export default function FooterAbout() {
  const aboutLinks = [
    { href: "/page/refund-policy", label: "Refund Policy" },
    { href: "/page/privacy-policy", label: "Privacy Policy" },
    { href: "/page/help", label: "Help" },
    { href: "/page/sitemap", label: "Sitemap" },
  ]

  return (
    <>
      <h4 className="bold mb-15">About</h4>
      {aboutLinks.map((link) => (
        <Link key={link.href} href={link.href} className="block mb-2 text-gray-600 hover:text-gray-800 transition-colors">
          {link.label}
        </Link>
      ))}
    </>
  )
} 