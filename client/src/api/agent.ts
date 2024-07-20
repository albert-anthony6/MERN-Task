import { toast } from 'react-toastify';
import { router } from '../routes/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CurrentUser, AuthUserFormValues } from '../utils/interfaces/user';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        // If id property is bad, go to not-found page
        if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
          router.navigate('/not-found');
        }
        // Restructuring errors object
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          // Pulling elements out of any subarrays
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('Unauthorized');
        break;
      case 403:
        toast.error('Forbidden');
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 429:
        toast.error('Too many requests. Try again later.');
        break;
      case 500:
        toast.error('Server Error');
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: object) => axios.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

// const Projects = {
//   list: (
//     pageNumber: number,
//     pageSize: number,
//     userId: string,
//     filterProjects?: boolean,
//     searchTerm?: string
//   ) =>
//     axios
//       .get<PaginatedResult<Project[]>>(
//         `/projects/?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}&filterProjects=${filterProjects}&searchTerm=${searchTerm}`
//       )
//       .then(responseBody),
//   details: (id: string, searchTerm: string) =>
//     requests.get<Project>(`/projects/${id}/?searchTerm=${searchTerm}`),
//   create: (name: string) => requests.post<void>('/projects/', { name }),
//   update: (id: string, appUserIds: string[]) =>
//     requests.patch<void>(`/projects/${id}/`, appUserIds),
//   delete: (id: string) => requests.delete<void>(`/projects/${id}`)
// };

const Account = {
  //   current: () => requests.get<CurrentUser>("/account"),
  //   login: (user: AuthUserFormValues) => requests.post<CurrentUser>('/account/login', user),
  register: (user: AuthUserFormValues) => requests.post<CurrentUser>('/user/register', user)
};

const agent = {
  Account
};

export default agent;
