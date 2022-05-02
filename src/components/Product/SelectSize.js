import { Form, Select } from 'antd';
import { useState } from 'react';
import { useSize } from '../../api/useSize';

const SelectSize = (props) => {
    const [valueSelected, setValueSelected] = useState([]);
    const handleChange = (value, option) => {
        let arr = [];
        arr = option.reduce((newArr, item) => {
            newArr.push({ id: item.key, name: item.value });
            return newArr;
        }, [])
        props.setSelectedItems(arr);
        setValueSelected(value);
    };
    const { isLoading, data, isError, error } = useSize();
    const filteredOptions = data?.data.filter(o => !valueSelected.includes(o.name));
    if (isError) {
        return <h2>{error.message}</h2>
    }
    return <Form.Item label="Sizes" name="size" rules={[{ required: true, message: 'Please select sizes product!' }]} tooltip="This is a required field">
        <Select
            loading={isLoading}
            mode="multiple"
            placeholder="Add an item..."
            value={props.selectedItems?.name}
            onChange={handleChange}
            style={{ width: '100%' }}
        >
            {!isLoading && filteredOptions.map((item) => (
                <Select.Option key={item.id} value={item.name} >
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
}
export default SelectSize;