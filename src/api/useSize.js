import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { timeCache } from "./config"

const fetchData = () => {
    return request({ url: 'sizes?_sort=created_at:DESC' })
}
export const useSize = (onSuccess, onError) => {
    return useQuery('size-list', fetchData, {
        onSuccess,
        onError,
        cacheTime: timeCache,
        staleTime: timeCache
    })
}
const fetchDataById = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: 'sizes/' + id });
}
export const useSizeDetail = (id) => {
    return useQuery(['size-detail', id],
        fetchDataById, {
        cacheTime: timeCache,
        staleTime: timeCache,
    })
}
const addSize = ({ data }) => {
    return request({ url: 'sizes/', method: 'post', data: data })
}
export const useAddSize = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(addSize, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('size-list')
        }
    })
}
const editSize = ({ id, data }) => {
    return request({ url: 'sizes/' + id, method: 'put', data: data });
}
export const useEditSize = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(editSize, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('size-list')
        }
    });
}

const removeDataById = (id) => {
    return request({ url: 'sizes/' + id, method: 'delete' });
}
export const useRemoveSize = (onSuccess, onError) => {
    const queryClient = useQueryClient()

    return useMutation(removeDataById, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('size-list')
        }
    });
}