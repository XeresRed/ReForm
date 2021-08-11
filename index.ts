import React from 'react';

const useForm = (InitialState) => {
    const [values, setValues] = React.useState(InitialState);
    const [errors, setErros] = React.useState({});

    const ValidateInput = (event) => {

        for (const validator of []) {
            
        }

    }

    const ValidateSubmit = (event) => {
        
    }

    return {
        values,
        errors,
        ValidateInput,
        ValidateSubmit
    }
    
}