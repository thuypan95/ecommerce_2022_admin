import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format as dateFormat } from 'date-fns';

export const displayDateTime = (date) => {
    return dateFormat(new Date(date), 'yyyy/MM/dd HH:mm:ss');
}
export const convertDistanceToNow = (date) => {
    return formatDistanceToNow(new Date(displayDateTime(date)), { addSuffix: true }, { includeSeconds: true })
}