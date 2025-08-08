"use client"

import Link from "next/link"
import styles from "./BottomNavigation.module.css"
import { useTranslation } from "../../hooks/useTranslation"

export default function BottomNavigation() {
  const { t } = useTranslation()

  return (
    <div className={styles.bottomArea}>
      <div className={styles.containerFluid}>
        <div className={styles.flexSided}>
          <div className={styles.leftLinks}>
            <Link href="/discover/products" className={styles.link}>
              <span>{t('navigation.discoverProducts')}</span>
            </Link>
            <Link href="/categories" className={styles.link}>
              <span>{t('navigation.categories')}</span>
            </Link>
            <Link href="/brands" className={styles.link}>
              <span>{t('navigation.brands')}</span>
            </Link>
            <Link href="/hot-deals" className={styles.link}>
              <span>{t('navigation.hotDeals')}</span>
            </Link>
          </div>
          <div className={styles.rightLinks}>
            <Link href="/track-order" className={styles.link}>
              <span>{t('navigation.trackOrder')}</span>
            </Link>
            <Link href="/page/faq" className={styles.link}>
              <span>{t('navigation.faq')}</span>
            </Link>
            <Link href="/page/help" className={styles.link}>
              <span>{t('navigation.help')}</span>
            </Link>
            <Link href="/page/contact" className={styles.link}>
              <span>{t('navigation.contactUs')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 