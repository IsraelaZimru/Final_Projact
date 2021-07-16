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



export default function checkpPreviousPages(histoy, ...localObjects) {
    for (const localObj of localObjects) {
        if (localStorage.getItem(localObj)) {
            const pageData = JSON.parse(localStorage.getItem(localObj));
            return pageData;
            // if (page.isDisabled || page.isDisabled === undefined) {
            //     histoy.push(`/${localObj.slice(0, 5)}_${localObj.slice(5)}`);
            //     break;
            // }
        } else {
            histoy.push(`/${localObj.slice(0, 5)}_${localObj.slice(5)}`);
            break;
        }
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