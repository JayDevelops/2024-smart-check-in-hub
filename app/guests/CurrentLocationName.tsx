import {HeadingTwo} from "@/components/Typography/Headers";
import {cn} from "@/lib/utils";

export default function CurrentLocationName({locationName, className}: {locationName: string, className?: string} ) {
    const headingClassName = cn(className)

    if (!locationName) {
        return (
            <HeadingTwo className={headingClassName}>Guests at All Locations</HeadingTwo>
        )
    }

    return (
        <HeadingTwo className={headingClassName}>Guests at {locationName}</HeadingTwo>
    )
}