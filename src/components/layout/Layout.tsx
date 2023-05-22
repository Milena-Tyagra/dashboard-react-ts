import React from "react"

import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"

import styles from "./Layout.module.css"
interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
