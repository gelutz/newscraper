import { AxiosError, AxiosResponse } from "axios";

export const responseHandler = (res: AxiosResponse) => {
    return res;
};

export const errorHandler = async (error: AxiosError) => {
    return new Promise(async (resolve, reject) => {
        console.log(error);
        if (error.response?.status === 401) {
            try {
                const data = await fetch("/refresh");
                const reader = data.body?.getReader();
                console.log(data, data.headers, reader?.read());
                localStorage.setItem(
                    "@Newscraper:Teste",
                    data.status.toString()
                );
                // if (data.status === 401) {
                // }

                const newJWT = data.headers.get("Authorization");
                if (newJWT) {
                    // new & refreshed access token
                    localStorage.setItem("@Newscraper:access", newJWT);
                }
                return resolve(error);
            } catch (error) {
                return reject(error);
            }
        }
    });
};
