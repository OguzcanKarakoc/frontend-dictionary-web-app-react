import { forwardRef, useId } from "react";
import SearchIcon from "../assets/images/icon-search.svg?react";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

interface SearchInputProps {
    errors?: FieldError;
    [key: string]: unknown;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    function Search(props, ref) {
        const id = useId();

        const { errors, ...otherProps } = props;

        return (
            <div className="relative">
                <label className="hidden" htmlFor={id} aria-label="Search">
                    Search:
                </label>
                <SearchIcon className="pointer-events-none absolute right-6 h-12 items-center md:h-16" />
                <input
                    ref={ref}
                    id={id}
                    className={clsx(
                        errors && "outline outline-1 outline-rose",
                        "h-12 w-full rounded-2xl bg-wild-sand px-6 text-base font-bold leading-normal text-mine-shaft-0 focus:outline-none focus:outline-medium-purple dark:bg-eerie-black dark:text-white md:h-16 mb-2",
                    )}
                    type="text"
                    title="Search"
                    placeholder="Search..."
                    {...otherProps}
                />
                {errors && <span className="text-rose">{errors.message}</span>}
            </div>
        );
    },
);

export default SearchInput;
