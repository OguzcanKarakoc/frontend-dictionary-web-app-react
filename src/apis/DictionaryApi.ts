import { api } from "./configs/AxiosConfigs";

export type Entries = Entry[];

export interface Entry {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
}

interface Phonetic {
    text: string;
    audio: string;
    sourceUrl?: string;
    license?: License;
}

interface License {
    name: string;
    url: string;
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

interface Definition {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
}

export const DictionaryApi = {
    getWord: async function (word: string) {
        return await api.request<Entries>({
            url: `/${word}`,
            method: "GET",
        });
    },
};
