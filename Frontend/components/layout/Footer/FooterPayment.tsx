import Link from "next/link"
import Image from "next/image"

export default function FooterPayment() {
  const paymentMethods = [
    {
      name: "Paypal",
      href: "https://www.paypal.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/paypal.png",
      alt: "Paypal",
      title: "Paypal"
    },
    {
      name: "MasterCard",
      href: "https://mastercard.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/master-card.png",
      alt: "MasterCard",
      title: "MasterCard"
    },
    {
      name: "VisaCard",
      href: "https://visa.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/visa-card.png",
      alt: "VisaCard",
      title: "VisaCard"
    },
    {
      name: "AmericanExpress",
      href: "https://americanexpress.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/american-express.png",
      alt: "AmericanExpress",
      title: "AmericanExpress"
    },
    {
      name: "Discover",
      href: "https://discover.com",
      image: "https://cdn.ishop.cholobangla.com/uploads/discover.png",
      alt: "Discover",
      title: "Discover"
    },
  ]

  return (
    <>
      <h4 className="bold mb-15">Payment</h4>
      <div className="payment-icons-compact">
        {paymentMethods.map((method) => (
          <Link key={method.name} href={method.href} target="_blank" className="payment-icon-link">
            <Image
              alt={method.alt}
              title={method.title}
              height={35}
              width={35}
              style={{ opacity: 1 }}
              src={method.image}
              className="payment-icon hover:opacity-80 transition-opacity"
            />
          </Link>
        ))}
      </div>
    </>
  )
} 