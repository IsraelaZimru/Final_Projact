// import { useField, Field } from 'formik';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { Form, } from 'react-bootstrap';


// export const MyInput = ({ label, ...props }) => {
//     // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//     // which we can spread on <input>. We can use field meta to show an error
//     // message if the field is invalid and it has been touched (i.e. visited)
//     const [field, meta] = useField(props);
//     return <Form.Group>
//         <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
//         <Form.Control className="text-input" {...field} {...props} />
//         {meta.touched && meta.error ? (
//             <small className="error">{meta.error}</small>
//         ) : null}
//     </Form.Group>
// };


// export const MyRadios = ({ options, label, ...props }) => {
//     // React treats radios and checkbox inputs differently other input types, select, and textarea.
//     // Formik does this too! When you specify `type` to useField(), it will
//     // return the correct bag of props for you -- a `checked` prop will be included
//     // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
//     const [field, meta] = useField({ ...props, type: 'radios' });
//     return <Form.Group>
//         <div role="group" aria-labelledby="my-radio-group">
//             <div>
//                 <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
//             </div>
//             {(options).map(([title, hisValue]) => <label>
//                 <Field type="radio" value={hisValue} {...field} {...props} />
//                 {title}
//             </label>
//             )}
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </div>
//     </Form.Group>
// };

// export const MySelect = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return <Form.Group>
//         <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
//         <select {...field} {...props} />
//         {meta.touched && meta.error ? (
//             <div className="error">{meta.error}</div>
//         ) : null}
//     </Form.Group>
// };

// export const MyFile = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return <Form.Group>
//         <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
//         <Form.File
//             className="position-relative"
//             {...field} {...props}
//         />
//         {meta.touched && meta.error ? (
//             <div className="error">{meta.error}</div>
//         ) : null}
//     </Form.Group >
// }