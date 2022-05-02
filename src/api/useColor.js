import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { timeCache } from "./config"

const fetchData = () => {
    return request({ url: 'colors?_sort=created_at:DESC' })
}
export const useColor = (onSuccess, onError) => {
    return useQuery('color-list', fetchData, {
        onSuccess,
        onError,
        cacheTime: timeCache,
        staleTime: 300000
    })
}
const fetchDataById = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: 'colors/' + id });
}
export const useColorDetail = (id) => {
    return useQuery(['color-detail', id],
        fetchDataById, {
        cacheTime: timeCache,
        staleTime: timeCache,
    })
}
const addColor = ({ data }) => {
    return request({ url: 'colors/', method: 'post', data: data })
}
export const useAddColor = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(addColor, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('color-list')
        }
    })
}
const editColor = ({ id, data }) => {
    return request({ url: 'colors/' + id, method: 'put', data: data });
}
export const useEditColor = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(editColor, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('color-list')
        }
    });
}

const removeDataById = (id) => {
    return request({ url: 'colors/' + id, method: 'delete' });
}
export const useRemoveColor = (onSuccess, onError) => {
    const queryClient = useQueryClient()

    return useMutation(removeDataById, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('color-list')
        }
    });
}