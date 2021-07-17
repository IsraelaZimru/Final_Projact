
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
