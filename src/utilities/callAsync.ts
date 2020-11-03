import {AxiosError, AxiosResponse} from "axios";

export function callAsync<T>(effect: () => Promise<AxiosResponse<T>>,
                             onSuccess: (result: T) => void,
                             onFail: (error: string) => void): void {
    effect().then((response: AxiosResponse<T>) => {
        if(response.status === 200) {
            onSuccess(response.data);
        } else {
            onFail(response.statusText); // TODO custom messages for error codes
        }
    }).catch((error: AxiosError<T>) => {
        onFail(error.message);
        logError<T>(error);
    });
}


function logError<T>(error: AxiosError<T>) {
    // TODO - https://github.com/axios/axios/pull/2014
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}
