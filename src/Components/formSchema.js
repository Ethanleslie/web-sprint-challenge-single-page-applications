import * as yup from 'yup'





const schema = yup.object().shape({
    name: yup.string().required('user is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().oneOf(['0', '1', '2', '3'], 'you must choose a size'),
    topping1: yup.boolean(),
    topping2: yup.boolean(), 
    topping3: yup.boolean(), 
    topping4: yup.boolean(), 
    special: yup.string()

})









export default schema;