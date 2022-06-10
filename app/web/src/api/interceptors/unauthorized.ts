import { AxiosError, AxiosResponse } from "axios";

export const UnauthorizedInterceptors = () => {
    return [responseHandler, errorHandler] as const;
};

const responseHandler = async (res: AxiosResponse) => {
    return Promise.resolve(res);
};

const errorHandler = async (error: AxiosError) => {
    if (error.response?.status === 401) {
        const data = await fetch("/refresh");
        const reader = data.body?.getReader();
        console.log(data, data.headers, reader?.read());
        localStorage.setItem("@Newscraper:Teste", data.status.toString());

        const newJWT = data.headers.get("Authorization");
        if (newJWT) {
            // new & refreshed access token
            localStorage.setItem("@Newscraper:access", newJWT);
        }
        return Promise.reject(error);
    }

    return Promise.reject(error);
};
