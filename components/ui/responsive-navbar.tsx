"use client"

import dynamic from "next/dynamic"
import { NavbarLite } from "./navbar-lite"

// Lazy load full Navbar only on desktop
const NavbarFull = dynamic(() => import("./navbar").then(mod => ({ default: mod.Navbar })), {
    ssr: false,
    loading: () => <NavbarLite />,
})

/**
 * ResponsiveNavbar - Shows lightweight CSS-only version on mobile,
 * full animated version on desktop.
 */
export function ResponsiveNavbar() {
    return (
        <>
            <div className="md:hidden"><NavbarLite /></div>
            <div className="hidden md:block"><NavbarFull /></div>
        </>
    )
}
