import {HeadingOne} from "@/components/Typography/Headers";
import {Text} from "@/components/Typography/Text";
import ReturnLink from "@/components/ReturnLink";

export default function GlobalNotFound() {
    return (
        <section className="not-found-section flex justify-center items-center my-56">
            <div className="text-center mx-auto">
                <HeadingOne className="my-4">
                    404 | Page Not Found
                </HeadingOne>

                <Text className="my-2">
                    Could not find the requested page.
                </Text>
                <ReturnLink linkTo="/">Return Home</ReturnLink>
            </div>
        </section>
    )
}