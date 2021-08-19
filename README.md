# Welcome to react-reforms documentation

This is a minimal library to help improve your forms in react.

[**DEMO**](https://codesandbox.io/s/demo-react-reforms-c9xjr?file=/src/styles.css)


## Quick start

```javascript
import { useForm, defaultValidators } from  'react-reforms';

const formStructure = {
	firstName: {
		value: "",
		validators: [defaultValidators.Required()],
		class: '',
        hasErrors: false
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
		value: 15,
		validators: [defaultValidators.Min(18), defaultValidators.Max(32)],
		class: ''
	}
}

function App() {
	const {values, errors, ValidateInput, addValidationRules, setValidators} =  useForm(formStructure, {customClass: {error: 'error', success: 'success'}});
	return (
		<form  style={{marginTop: '12%'}} onSubmit={ e  =>  onSubmit(e)}>
			<div  className="form-control"  style={{margin: '5% 0'}}>
				<input  type="text"  id="firstName"  name="firstName" onChange={e  => ValidateInput(e.target.name, e.target.value)} className={`${values.firstName.class}`} />
			</div>
			<div  className="form-control"  style={{margin: '5% 0'}}>
				<input  type="text"  id="lastName"  name="lastName" onChange={e  => ValidateInput(e.target.name, e.target.value)} className={`${values.repeatPass.class}`} />
			</div>
			<div  className="form-control"  style={{margin: '5% 0'}}>
				<input  type="email"  id="email"  name="email" onChange={e  => ValidateInput(e.target.name, e.target.value)} className={`${values.email.class}`} />
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

#### useForm config
you can provide some configurations for the hook

```json
{
	"customClass": {
		"error": "error", // return this custom class when the validator fail
		"success": "success" // return this custom class when the validator pass
	}
}
```

#### Form structure
To create the forms fields we need lest two elements how it show the next table.
|  Field                | Description  |
|:----------------------|:-------------|
| **value**             | **Requiered**, It's the value of the field you can init |
| **validators**        | **Requiered**, It's the array of validators you can set, if you don't want set any validator you can pass a empty array |
| **class**             | **Optional**, If you put a customClass to return in the config of useForm this parameter reflect that. |
| **hasError**          | **Optional**, Indicate if this field pass or not all validatiors, it's true if fail any validation and false if pass all validation |


## Custom validators
We  make a custom validator for validate the password  match with repeated password.

First need to create a custom validators:
```javascript
const CustomValidators = {
	...defaultValidators,
	repeatPass: (extras:  IExtrasConfig) => ({type: 'repeatPass', data: null, extras})
}
```


#### Interface IExtrasConfig

```typescript
interface IExtrasConfig {
    bindField?: string;
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
     React.useEffect( () => {
        addValidationRules(CustomRulesValidations)
        setValidators('repeatPass',  [CustomValidators.repeatPass({bindField: 'firstName'})])
    },[])
	....
```

and it's all