import Link from "next/link"
import Image from "next/image"

export default function FooterSocial() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/instagram.png",
      alt: "Instagram",
      title: "Instagram"
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/facebook.png",
      alt: "Facebook",
      title: "Facebook"
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/twitter.png",
      alt: "Twitter",
      title: "Twitter"
    },
    {
      name: "Linkedin",
      href: "https://linkedin.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/linkedin.png",
      alt: "Linkedin",
      title: "Linkedin"
    },
  ]

  return (
    <>
      <h4 className="bold mb-15">Social</h4>
      <div className="social-icons-compact">
        {socialLinks.map((social) => (
          <Link 
            key={social.name} 
            href={social.href} 
            target="_blank" 
            className="social-icon-link"
          >
            <Image
              alt={social.alt}
              title={social.title}
              height={30}
              width={30}
              style={{ opacity: 1 }}
              src={social.image}
              className="social-icon hover:opacity-80 transition-opacity"
            />
            <span className="social-text">{social.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
} 