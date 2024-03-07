import ReactMarkdown from "react-markdown";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Guest} from "@prisma/client";
import GuestStatusBadge from "@/components/GuestStatusBadge";
import {Text} from "@/components/Typography/Text";


export default function GuestDetails({guest}: {guest: Guest}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">{guest.fullName}</CardTitle>
                <div className="flex flex-row space-x-3">
                    <Text>{guest.signedIn.toDateString()}</Text>
                    <GuestStatusBadge status={guest.status}/>
                </div>
            </CardHeader>

            <CardContent>
                <CardTitle>Guest Notes</CardTitle>
                <GuestNotes guestNotes={guest.notes} />
            </CardContent>
        </Card>
    )
}

//  Responsible for displaying guest notes when there is, if not then display a default text label.
function GuestNotes({guestNotes}: {guestNotes: string | null}) {
    if(!guestNotes) {
        return <Text variant="normal">No notes available for this guest, if you like to add notes for this guest click on &#34;Edit Guest&#34; Button.</Text>
    }

    return (
        <ReactMarkdown className="prose prose-stone dark:prose-invert">{guestNotes}</ReactMarkdown>
    )
}