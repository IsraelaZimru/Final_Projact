export function hasPageAaccess(connected, history) {
    // console.log("connected status", connected);
    if (!localStorage.getItem("user")) {
        // if (!connected) {
        // console.log("not connected - return home page", connected);
        history.push("/")
    }
    // console.log("connected, staying in this page", connected);
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

