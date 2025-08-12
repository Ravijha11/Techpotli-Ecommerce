"use client"

import Link from "next/link"
import Image from "next/image"
import FooterServices from "./FooterServices"
import FooterAbout from "./FooterAbout"
import FooterPayment from "./FooterPayment"
import FooterSocial from "./FooterSocial"
import { useTranslation } from "../../../hooks/useTranslation"

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="modern-footer bg-gray-50 responsive-section">
      <div className="bottom-area section pb-0">
        <div className="w-full px-4 md:px-6 lg:px-8 responsive-container">
          {/* Logo and Brand Section */}
          <div className="footer-brand-section text-center md:text-left mb-8">
            <div className="logo-container flex justify-center md:justify-start mb-4">
              <Image
                src="/techpotlilogo.png"
                alt="TechPotli Logo"
                width={280}
                height={90}
                className="footer-logo h-16 md:h-20 w-auto responsive-logo"
                priority
              />
            </div>
            <p className="footer-description text-gray-600 responsive-text max-w-2xl mx-auto md:mx-0">
              {t('footer.description')}
            </p>
          </div>

          {/* Main Footer Content */}
          <div className="footer-grid responsive-footer">
            <div className="footer-section">
              <FooterServices />
            </div>
            <div className="footer-section">
              <FooterAbout />
            </div>
            <div className="footer-section payment">
              <FooterPayment />
            </div>
            <div className="footer-section">
              <FooterSocial />
            </div>
          </div>
          
          <div className="copyright-section mt-8 pt-6 border-t border-gray-200">
            <div className="copyright-line"></div>
            <p className="copyright-text text-center text-gray-600 responsive-text">
              © 2025 - All rights reserved by <span className="brand-name font-semibold">TechPotli</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 