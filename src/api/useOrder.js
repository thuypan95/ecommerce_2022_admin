import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { timeCache } from "./config"

const fetchData = () => {
    return request({ url: 'orders?_sort=created_at:DESC' })
}
export const useOrder = (onSuccess, onError) => {
    return useQuery('order-list', fetchData, {
        onSuccess,
        onError,
        cacheTime: timeCache,
        staleTime: timeCache
    })
}
const fetchDataById = ({ queryKey }) => {
    const id = queryKey[1];
    return request({ url: 'orders/' + id });
}
export const useOrderDetail = (id) => {
    return useQuery(['order-detail', id],
        fetchDataById, {
        cacheTime: timeCache,
        staleTime: timeCache,
    })
}
const editOrder = ({ id, data }) => {
    return request({ url: 'orders/' + id, method: 'put', data: data });
}
export const useEditOrder = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation(editOrder, {
        onSuccess,
        onError,
        onSettled: () => {
            queryClient.invalidateQueries('order-list')
        }
    });
}
