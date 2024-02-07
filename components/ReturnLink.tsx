import {ReactNode} from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import {cn} from "@/lib/utils";

interface ReturnLinkProps {
    children: ReactNode,
    linkTo: string,
    className?: string,
}
export default function ReturnLink({children, linkTo, className}: ReturnLinkProps) {
    return (
        <Link className={cn(buttonVariants({ variant: "outline" }), className)} href={linkTo}>
            {children}
        </Link>
    )
}