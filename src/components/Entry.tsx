import { Entry as ApiEntry } from "../apis/DictionaryApi";
import PlayButton from "./PlayButton";
import ExternalLinkIcon from "../assets/images/icon-new-window.svg?react";
import { Fragment, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface EntryProps {
    entry: ApiEntry;
}

function Entry({ entry }: EntryProps) {
    const [, setSearchParams] = useSearchParams();

    const handleAudio = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const audioUrl = entry.phonetics.find(
            (phonetic) => phonetic.audio,
        )?.audio;
        if (!audioUrl) return;

        const audio = new Audio(audioUrl);
        audio.play();
    }, [entry.phonetics]);

    const handleSearch = (word: string) => {
        setSearchParams({ search: word });
    };

    return (
        <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex">
                <div className="flex flex-1 flex-col">
                    <h2 className="pb-1 text-3xl font-bold dark:text-white md:text-6xl">
                        {entry.word}
                    </h2>
                    <span className="text-lg text-medium-purple md:text-2xl">
                        {entry.phonetic}
                    </span>
                </div>

                <PlayButton
                    onClick={handleAudio}
                    className="h-12 w-12 md:h-20 md:w-20 "
                />
            </div>

            {entry.meanings.map((meaning, index) => (
                <div key={`meaning_${index}`}>
                    <div className="mb-8 flex items-center gap-4 md:mb-10 md:gap-6">
                        <span className="text-lg font-bold italic text-mine-shaft-0 dark:text-mine-shaft-1 md:text-2xl">
                            {meaning.partOfSpeech}
                        </span>
                        <div className="h-[1px] w-full bg-mercury dark:bg-mine-shaft-1"></div>
                    </div>

                    <div className="mb-6 md:mb-10">
                        <h3 className="mb-4 text-base text-sonic-silver md:text-xl">
                            Meanings
                        </h3>
                        <ul className="list-outside list-disc space-y-4 pl-5 marker:text-medium-purple md:ml-4">
                            {meaning.definitions.map((defintion, index) => (
                                <li
                                    key={index}
                                    className="pl-2 text-base md:text-lg"
                                >
                                    <p className="text-mine-shaft-0 dark:text-white">
                                        {defintion.definition}
                                    </p>
                                    {defintion.example && (
                                        <p className="mt-4 text-sonic-silver">
                                            “{defintion.example}”
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {meaning.synonyms.length > 0 && (
                        <div className="mb-6 flex gap-6 md:mb-10 md:gap-10">
                            <h3 className="text-base text-sonic-silver md:text-xl">
                                Synonyms
                            </h3>
                            <p className="text-base text-mine-shaft-0 dark:text-white md:text-xl">
                                {meaning.synonyms.map(
                                    (synonym, index, array) => (
                                        <Fragment key={index}>
                                            <span
                                                onClick={() =>
                                                    handleSearch(synonym)
                                                }
                                                className="font-bold text-medium-purple hover:cursor-pointer hover:underline"
                                            >
                                                {synonym}
                                            </span>
                                            {index != array.length - 1 && ", "}
                                        </Fragment>
                                    ),
                                )}
                            </p>
                        </div>
                    )}

                    {meaning.antonyms.length > 0 && (
                        <div className="flex gap-6 md:gap-10">
                            <h3 className="text-base text-sonic-silver md:text-xl">
                                Antonyms
                            </h3>
                            <p className="text-base text-mine-shaft-0 dark:text-white md:text-xl">
                                {meaning.antonyms.map(
                                    (antonym, index, array) => (
                                        <Fragment key={index}>
                                            <span className="font-bold text-medium-purple">
                                                {antonym}
                                            </span>
                                            {index != array.length - 1 && ", "}
                                        </Fragment>
                                    ),
                                )}
                            </p>
                        </div>
                    )}
                </div>
            ))}

            <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                <h2 className="text-base text-sonic-silver underline md:no-underline">
                    Source
                </h2>
                <div className="flex flex-col">
                    {entry.sourceUrls.map((source, index) => (
                        <a
                            key={`source_${index}`}
                            href={source}
                            className="inline-flex items-center font-medium text-mine-shaft-0 hover:underline dark:text-white"
                        >
                            {source}{" "}
                            <ExternalLinkIcon className="ms-2 h-3 w-3" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Entry;
