import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

/** 基础请求配置 */
const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
};

/** 创建 axios 实例 */
export const request: AxiosInstance = axios.create(defaultConfig);

/** 响应错误结构（按需与后端约定） */
export interface ApiErrorBody {
  code?: number;
  message?: string;
  errors?: Record<string, string[]>;
}

/** 请求拦截器 */
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可在此注入 token 等
    // const token = getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

/** 响应拦截器 */
request.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      // 未授权，可跳转登录或刷新 token
    }
    if (status === 403) {
      // 无权限
    }
    if (status && status >= 500) {
      // 服务端错误
    }

    const message =
      data?.message ?? error.message ?? "请求失败，请稍后重试";
    return Promise.reject(new Error(message));
  },
);

/** 封装 GET */
export function get<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return request.get<T>(url, config) as Promise<T>;
}

/** 封装 POST */
export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  return request.post<T>(url, data, config) as Promise<T>;
}

/** 封装 PUT */
export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  return request.put<T>(url, data, config) as Promise<T>;
}

/** 封装 PATCH */
export function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) {
  return request.patch<T>(url, data, config) as Promise<T>;
}

/** 封装 DELETE */
export function del<T = unknown>(url: string, config?: AxiosRequestConfig) {
  return request.delete<T>(url, config) as Promise<T>;
}
