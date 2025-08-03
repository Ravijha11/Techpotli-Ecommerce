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
    <footer className="modern-footer">
      <div className="bottom-area section pb-0">
        <div className="w-full px-4 md:px-6 lg:px-8">
          {/* Logo and Brand Section */}
          <div className="footer-brand-section">
            <div className="logo-container">
              <Image
                src="/techpotlilogo.png"
                alt="TechPotli Logo"
                width={280}
                height={90}
                className="footer-logo"
                priority
              />
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>

          {/* Main Footer Content */}
          <div className="footer-grid">
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
          
          <div className="copyright-section">
            <div className="copyright-line"></div>
            <p className="copyright-text">
              © 2025 - All rights reserved by <span className="brand-name">TechPotli</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 