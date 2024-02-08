import React, { useEffect } from "react";
import { Form } from "react-router-dom";
import SearchInput from "./SearchInput";
import clsx from "clsx";
import * as yup from "yup";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface SearchFormProps {
    onSubmit: (search: string) => void;
    onError: (errors: FieldErrors<FormData>) => void;
    className?: string;
}

export type FormData = {
    search: string;
};

const schema = yup
    .object({
        search: yup.string().required("Whoops, can't be empty..."),
    })
    .required();

function SearchForm({ onSubmit, onError, className }: SearchFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");

        setValue("search", searchParam || "");

        if (searchParam) {
            onSubmit(searchParam);
        }
    }, [setValue, onSubmit]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            handleSubmit(
                (data) => onSubmit(data.search),
                (errors) => onError(errors),
            )();
        }
    };

    return (
        <Form onKeyDown={handleKeyDown} className={clsx(className)}>
            <SearchInput
                errors={errors.search}
                {...register("search", { required: true })}
            />
        </Form>
    );
}

export default SearchForm;
