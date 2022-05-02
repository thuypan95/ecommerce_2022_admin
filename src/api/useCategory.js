import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { timeCache } from "./config"

const fetchData = () => {
    return request({ url: 'categories?_sort=created_at:DESC' })
}
export const useCategory = (onSuccess, onError) => {
    return useQuery('category-list', fetchData, {
        onSuccess,
        onError,
        cacheTime: timeCache,
        staleTime: timeCache
    })
}
const fetchDataById = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: 'categories/' + id });
}
export const useCategoryDetail = (id) => {
    return useQuery(['category-detail', id],
        fetchDataById, {
        cacheTime: timeCache,
        staleTime: timeCache,
    })
}
const addCategory = ({ data }) => {
    return request({ url: 'categories/', method: 'post', data: data })
}
export const useAddCategory = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(addCategory, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('category-list')
        }
    })
}
const editCategory = ({ id, data }) => {
    return request({ url: 'categories/' + id, method: 'put', data: data });
}
export const useEditCategory = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(editCategory, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('category-list')
        }
    });
}

const removeDataById = (id) => {
    return request({ url: 'categories/' + id, method: 'delete' });
}
export const useRemoveCategory = (onSuccess, onError) => {
    const queryClient = useQueryClient()

    return useMutation(removeDataById, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('category-list')
        }
    });
}