"use client"

import Link from "next/link"
import styles from "./BottomNavigation.module.css"
import { useTranslation } from "../../hooks/useTranslation"

export default function BottomNavigation() {
  const { t } = useTranslation()

  return (
    <div className={`${styles.bottomArea} responsive-section`}>
      <div className={`${styles.containerFluid} responsive-container`}>
        <div className={`${styles.flexSided} responsive-nav`}>
          <div className={`${styles.leftLinks} responsive-nav`}>
            <Link href="/discover/products" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.discoverProducts')}</span>
            </Link>
            <Link href="/categories" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.categories')}</span>
            </Link>
            <Link href="/brands" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.brands')}</span>
            </Link>
            <Link href="/hot-deals" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.hotDeals')}</span>
            </Link>
          </div>
          <div className={`${styles.rightLinks} responsive-nav`}>
            <Link href="/track-order" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.trackOrder')}</span>
            </Link>
            <Link href="/page/faq" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.faq')}</span>
            </Link>
            <Link href="/page/help" className={`${styles.link} responsive-button`}>
              <span className="responsive-text">{t('navigation.help')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 