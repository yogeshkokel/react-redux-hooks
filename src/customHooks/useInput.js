import { useState } from 'react';

function useInput(initalValue) {
    //get inital value from props
    const [value, setValue] = useState(initalValue);

    //reset value function
    const resetValue = () => {
        setValue('')
    }
    //set value of input
    const bindValue = {
        value,
        onChange: e => {
            setValue(e.target.value);
        }
    }
    //return value & functions
    return [value, resetValue, bindValue];
}

export default useInput;