"use client"
import React from 'react';
import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import {ModeToggle} from "@/components/mode-toggle";

interface RightActionLinksProps {
    userAuthenticated: React.ReactNode,
}

export default function RightActionLinks({userAuthenticated}: RightActionLinksProps) {
    return (
        <NavigationMenu className="flex items-center">
            <NavigationMenuList className="gap-x-2 lg:gap-x-4">
                <NavigationMenuItem>
                    {userAuthenticated}
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <ModeToggle />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}