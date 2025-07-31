"use client"

import Link from "next/link"
import styles from "./BottomNavigation.module.css"

export default function BottomNavigation() {
  return (
    <div className={styles.bottomArea}>
      <div className={styles.containerFluid}>
        <div className={styles.flexSided}>
          <div className={styles.leftLinks}>
            <Link href="/discover/products" className={styles.link}>
              <span>DISCOVER PRODUCTS</span>
            </Link>
            <Link href="/categories" className={styles.link}>
              <span>CATEGORIES</span>
            </Link>
            <Link href="/brands" className={styles.link}>
              <span>BRANDS</span>
            </Link>
            <Link href="/flash-sale" className={styles.link}>
              <span>HOT DEALS</span>
            </Link>
          </div>
          <div className={styles.rightLinks}>
            <Link href="/track-order" className={styles.link}>
              <span>TRACK ORDER</span>
            </Link>
            <Link href="/page/faq" className={styles.link}>
              <span>FAQ</span>
            </Link>
            <Link href="/page/help" className={styles.link}>
              <span>HELP</span>
            </Link>
            <Link href="/page/contact" className={styles.link}>
              <span>CONTACT US</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 