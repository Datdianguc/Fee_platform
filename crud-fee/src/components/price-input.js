import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

export default function PriceInput(props) {
  const { id, value = {}, onChange } = props;
  const [number, setNumber] = useState(value.number || 0);
  const [currency, setCurrency] = useState(value.currency || 'VND');

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        number,
        currency,
        ...value,
        ...changedValue,
      });
    }
  };

  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);

    if(currency === '%' && (newNumber < 1 || newNumber > 99)){
        return;
    }
    if (!Number.isNaN(newNumber)) {
      setNumber(newNumber);
      triggerChange({number: newNumber})
    }
  };

  const onCurrencyChange = (newCurrency) => {  
    setCurrency(newCurrency);
    const newNumber = newCurrency === "%" ? Math.min(number, 0) : number;
    setNumber(newNumber);
    triggerChange({ currency: newCurrency, number: newNumber });
  };

  return (
    <span id={id}>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 795 }}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 100, marginLeft: 18 }}
        onChange={onCurrencyChange}
      >
        <Option value="VND">VND</Option>
        <Option value="%">%</Option>
      </Select>
    </span>
  );
}
