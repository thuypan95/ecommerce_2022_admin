import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { timeCache } from "./config"

const fetchData = () => {
    return request({ url: 'users?_sort=created_at:DESC' })
}
export const useUser = (onSuccess, onError) => {
    return useQuery('user-list', fetchData, {
        onSuccess,
        onError,
        cacheTime: timeCache,
        staleTime: timeCache
    })
}
const fetchDataById = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: 'users/' + id });
}
export const useUserDetail = (id) => {
    return useQuery(['user-detail', id],
        fetchDataById, {
        cacheTime: timeCache,
        staleTime: timeCache,
    })
}
const editUser = ({ id, data }) => {
    return request({ url: 'users/' + id, method: 'put', data: data });
}
export const useEditUser = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(editUser, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('user-list')
        }
    });
}
