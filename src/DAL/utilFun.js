import { addNewUser, getRecipeNames } from './api'

export const checkingSignUp = async (setValidated, setShow, details) => {
    window.scrollTo(0, 0);
    const result = addNewUser(details).then(res => res);
    console.log("result", result);
    if (!result) {
        setValidated(false);
        setShow(true)
        console.log("result is truthy =", result);
    } else {
        alert("works!!!😍🥰")
        console.log("result is falsy =", result);
    }
}



// export const get
// export const checkingSignUp = async (setValidated, setShow, details) => {
//     window.scrollTo(0, 0);
//     const result = fakeUsers.find(user => user.email === details.email.value);
//     if (!!result) {
//         setValidated(false);
//         setShow(true)
//     } else {
//         alert("works!!!😍🥰")
//     }
// }