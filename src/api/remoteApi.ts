import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import User from "../models/User";
import Todo from "../models/Todo";

const remoteApi: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
} as AxiosRequestConfig);


export const fetchUsers = (): Promise<AxiosResponse<User[]>> => {
    return remoteApi.get('users');
};


export const fetchTodos = (id: number): Promise<AxiosResponse<Todo[]>> => {
    return remoteApi.get(`users/${id}/todos`);
};
