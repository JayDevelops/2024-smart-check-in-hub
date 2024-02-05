"use client"
import React from "react"
import {usePathname} from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {menuLinks, NavigationLink} from "@/components/Navigation/NavigationLinks";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function LeftDesktopNavLinks() {
    const currentPath = usePathname()
    return (
        <NavigationMenu className="flex items-center gap-6 text-sm">
            <NavigationMenuList>
                {menuLinks.map((menuLink: NavigationLink) => (
                    <NavigationMenuItem key={menuLink.id}>
                        <Link href={menuLink.href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn({
                                'text-primary/90': menuLink.href === currentPath,
                                'text-secondary-foreground': menuLink.href !== currentPath,
                                'transition-colors': true,
                            }) + navigationMenuTriggerStyle() }
                            >
                                {menuLink.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
