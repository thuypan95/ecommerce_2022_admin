import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { timeCache } from "./config";

const fetchData = () => {
    return request({ url: 'products?_sort=created_at:DESC' });
}
export const useProduct = (onSuccess, onError) => {
    return useQuery('product-list', fetchData, {
        cacheTime: timeCache,
        staleTime: timeCache,
        onSuccess,
        onError,
    });
}
const fetchDataById = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: 'products/' + id });
}
export const useProductDetail = (id) => {
    return useQuery(['product-detail', id],
        fetchDataById, {
        cacheTime: timeCache,
        staleTime: timeCache,
    });
}
const addProduct = ({ data }) => {
    return request({ url: 'products/', method: 'post', data: data });
}
export const useAddProduct = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(addProduct, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('product-list')
        }
    });
}
const editProduct = ({ id, data }) => {
    return request({ url: 'products/' + id, method: 'put', data: data });
}
export const useEditProduct = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(editProduct, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('product-list')
        }
    });
}

const removeDataById = (id) => {
    return request({ url: 'products/' + id, method: 'delete' });
}
export const useRemoveProduct = (onSuccess, onError) => {
    const queryClient = useQueryClient()

    return useMutation(removeDataById, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('product-list')
        }
    });
}