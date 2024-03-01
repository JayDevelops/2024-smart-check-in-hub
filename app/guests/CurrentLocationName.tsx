import {HeadingOne} from "@/components/Typography/Headers";
import {cn} from "@/lib/utils";

export default function CurrentLocationName({locationName, className}: {locationName: string, className?: string} ) {
    const headingClassName = cn(className)

    if (!locationName) {
        return (
            <HeadingOne className={headingClassName}>Guests at All Locations</HeadingOne>
        )
    }

    return (
        <HeadingOne className={headingClassName}>Guests at {locationName}</HeadingOne>
    )
}