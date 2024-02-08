import { Fragment } from "react";
import { Entries } from "../apis/DictionaryApi";
import Entry from "./Entry";

interface EntriesFeedProps {
    entries: Entries | null;
}

function EntriesFeed({ entries }: EntriesFeedProps) {
    if (!entries) return;

    return (
        <div className="flex flex-col gap-6 md:gap-12">
            {entries.map((entry, index) => (
                <Fragment key={index}>
                    <Entry entry={entry} />
                    <hr />
                </Fragment>
            ))}
        </div>
    );
}

export default EntriesFeed;
