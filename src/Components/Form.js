import React, {useState, useEffect} from 'react'
import axios from 'axios'
import schema from './formSchema'
import * as yup from 'yup'


const initialFormValues = {
    name: '', size: '', topping1: 'false', topping2: 'false', topping3: 'false', topping4:'false', special: ''
}


function SimpleForm() {
    const [pizzas, setPizzas] = useState('')
    const [formValues, setFormValues] = useState(initialFormValues)
    const [errors, setErrors] = useState({name: ''})
    const [disabled, setDisabled] = useState(true)

    const change= (evt) => {
       const { name, value } = evt.target;
       validateChange(name, value)
       setFormValues({ ...formValues, [name]: value })
    }

    
const validateChange = (name, value) => {
    yup.reach(schema, name)
        .validate(value)
        .then(()=>{
            setErrors({...errors, [name]:""})
        })
        .catch((error)=> {
            setErrors({...errors, [name]: error.errors[0]})
        })
}


   
    useEffect(() => {
        schema.isValid(formValues).then((enabled) => setDisabled(!enabled))
    }, [formValues])

    const submit = (evt) => {
       evt.preventDefault();
       setPizzas(pizzas.concat({ name: formValues.name, size: formValues.size, topping1: formValues.topping1, topping2: formValues.topping2, special: formValues.special}));
       setFormValues({ name: "", size: "", topping1: 'false', topping2: "false", special: ""})
       const newOrder = {Order: formValues.name.trim(), size: formValues.size, topping1: formValues.topping1, topping2: formValues.topping2, special: formValues.special };
       axios.post(`https://reqres.in/api/orders`, newOrder)
       .then(res => {
            setFormValues({name: '', size: '', topping1: 'false', topping2: 'false', topping3: 'false', topping4:'false', special: ''})
       })
       .catch(err => {
            console.log(err)
       })
    }

   
       return (
           <div className="container">
               <h1>Pizza Builder</h1>
            <div style={{color: 'red'}}>
            <div>{errors.name}</div>
            </div>
               <form onSubmit={submit} id="pizza-form">
                <label>
                   Name:  
                   <input id="name-input"
                   name="name"
                   type="text"
                   value={formValues.name}
                   onChange={change}
                   />
                </label>
                   <label htmlFor="size">Choose a size:</label>
                    <select id="size-dropdown" name="size">
                        <option value="volvo">Small</option>
                        <option value="saab">Medium</option>
                        <option value="fiat">Large</option>
                        <option value="audi">Sasquatch</option>
                </select>
                <label>
                    Topping #1
                   <input
                   name="topping1"
                   type="checkbox"
                   value="false"
                   onChange={change}
                   />
                </label>
                <label>
                    Topping #2
                   <input
                   name="topping1"
                   type="checkbox"
                   value="false"
                   onChange={change}
                   />
                </label>
                <label>
                    Topping #3
                   <input
                   name="topping1"
                   type="checkbox"
                   value="false"
                   onChange={change}
                   />
                </label>
                <label>
                    Topping #4
                   <input
                   name="topping2"
                   type="checkbox"
                   value="false"
                   onChange={change}
                   />
                </label>
                <label>
                    Special Instructions
                   <input id= "special-text"
                   name="special"
                   type="text"
                   value={formValues.special}
                   onChange={change}
                   />
                </label>
                <label>
                    Submit
                   <button type="submit" id='order-button' disabled={disabled}>Build your pizza!</button>
                   
        
                   </label>
               </form> 
           </div>
           
       )}
   export default SimpleForm;
   