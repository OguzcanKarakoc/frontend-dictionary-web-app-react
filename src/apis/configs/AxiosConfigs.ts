import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + import.meta.env.VITE_API_ROOT_PATH,
});

const errorHandling = (error: {
    response: { status : number };
    code: string;
}): Promise<never | void> => {
    const statusCode = error.response?.status;
    if (error.code === "ERR_CANCELED") {
        return Promise.resolve();
    }

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        // console.error(error);
    }

    return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
    return errorHandling(error);
});
