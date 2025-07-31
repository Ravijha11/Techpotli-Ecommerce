import Link from "next/link"

interface FooterLinksProps {
  title: string
  links: Array<{ href: string; label: string }>
}

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 