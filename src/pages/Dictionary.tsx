import { useCallback, useState } from "react";
import { Entries, DictionaryApi } from "../apis/DictionaryApi";
import SearchForm from "../components/SearchForm";
import EntriesFeed from "../components/EntriesFeed";
import FallbackLoading from "../components/loader/FallbackLoading";
import axios from "axios";

/**
 * Responsible for rendering the dictionary page and its components.
 *
 * - Responsible for the `entries` state.
 * - Passes `entries` state to the `EntriesFeed` component.
 * - Responsible for the container styles.
 */
function Dictionary() {
    const [entries, setEntries] = useState<Entries | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback((search: string) => {
        const fetchAsync = async () => {
            try {
                setLoading(true);
                const result = await DictionaryApi.getWord(search);
                setEntries(result.data);
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status == 404
                ) {
                    setEntries([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAsync();
    }, []);

    const handleErrors = useCallback(() => {
        setEntries(null);
    }, []);

    const renderPage = useCallback(() => {
        if (loading) return <FallbackLoading />;

        if (entries == null) return;

        if (entries.length > 0) return <EntriesFeed entries={entries} />;

        return (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="text-6xl">😕</div>
                <h2 className="text-xl text-mine-shaft-0 font-bold dark:text-white">
                    No Definitions Found
                </h2>
                <p className="text-lg text-sonic-silver">
                    Sorry pal, we couldn't find definitions for the word you
                    were looking for. You can try the search again at later time
                    or head to the web instead.
                </p>
            </div>
        );
    }, [loading, entries]);

    return (
        <>
            <SearchForm onSubmit={handleSearch} onError={handleErrors} />

            {renderPage()}
        </>
    );
}

export default Dictionary;
