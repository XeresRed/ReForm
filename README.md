# Welcome to react-reforms documentation

This is a minimal library to help improve your forms in react.


## Quick start

```javascript
import { useForm, defaultValidators } from  'react-reforms';

const formStructure = {
	firstName: {
		value: "",
		validators: [defaultValidators.Required()],
		class: ''
	},
	lastName: {
		value: "",
		validators: [defaultValidators.Required()],
		class: ''
	},
	email: {
		value: "",
		validators: [defaultValidators.Required(), defaultValidators.Email(null)],
		class: ''
	},
	age: {
		value: "",
		validators: [defaultValidators.Min(18), defaultValidators.Max(32)],
		class: ''
	}
}

function App() {
	const {values, errors, ValidateInput, addValidationRules, setValidators} =  useForm(formStructure, {customClass: {error: 'error', success: 'success'}});
	return (
		<form  style={{marginTop: '12%'}} onSubmit={ e  =>  onSubmit(e)}>
			<div  className="form-control"  style={{margin: '5% 0'}}>
				<input  type="text"  id="firstName"  name="firstName" onChange={e  =>  			ValidateInput(e.target.name, e.target.value)} className={`${values.firstName.class}`} />
			</div>
			<div  className="form-control"  style={{margin: '5% 0'}}>
				<input  type="text"  id="lastName"  name="lastName" onChange={e  =>  ValidateInput(e.target.name, e.target.value)} className={`${values.repeatPass.class}`} />
			</div>
			<div  className="form-control"  style={{margin: '5% 0'}}>
				<input  type="email"  id="email"  name="email" onChange={e  =>  ValidateInput(e.target.name, e.target.value)} className={`${values.email.class}`} />
			</div>
			<button  type="submit"  className="primary"  style={{right: '2%', width: "10rem"}}>
				Send
			</button>
	</form>
	);
}

```

## Field summary

|  Field | Description  |
|:--------|:--------------|
| **defaultValidators** |  Object that contains default validators, the default validators are Required(), MinLength(length), MaxLength(length), Min(value), Max(value), Email(pattern?)|  
|  **values** |  State copy of your form structure, this structure always contain least value and validators the class property only works for return custom className |  
| **errors**  |  Contains all errors of you forms separate by the field name | 
| **ValidateInput** | Function to validate the date from your input, this function receive two args the name of the field and the value |
| **addValidationRules** | Allow create custom validation rules |
| **setValidators** | Allow set custom validations to forms fields | 


## Custom validators
We  make a custom validator for validate the password  match with repeated password.

First need to create a custom validators:
```javascript
const CustomValidators = {
	...defaultValidators,
	repeatPass: (extras:  IExtrasConfig) => ({type: 'repeatPass', data: null, extras})
}
```

Then create the rule of validation
```javascript
const CustomRulesValidations:  ValidationType  = {
	repeatPass: (value:  string, validators: {type:  string, data:  string, extras: {}}) => {
		if (value ===  validators.data) return {repeatPass: false}
		return {repeatPass: true};
	}
}
```

Finally add our custom validator with the methods
```javascript
function App() {
	const {values, errors, ValidateInput, addValidationRules, setValidators} =  useForm(formStructure, {customClass: {error: 'error', success: 'success'}});
	addValidationRules(CustomRulesValidations, {acceptData: false})
	setValidators('repeatPass', [CustomValidators.repeatPass({bindField: {field:'firstName', activate: true}})]) // Aggregates the
	....
```

and it's all