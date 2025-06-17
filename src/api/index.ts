import { get, post } from "@/http/request";

export type LoginData = {
	username: string;
	password: string;
};

export type LoginResult = {
	username: string;
	accessToken: string;
	roles: string[];
};

export const userLogin = async (data: LoginData) => {
	return post<LoginResult>({}, "/login", data);
};
