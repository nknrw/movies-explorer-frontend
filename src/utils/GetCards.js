import {WIDTH_WIDESCREEN} from "./constants";
import {WIDTH_TABLET} from "./constants";
import {WIDTH_MOBILE} from "./constants";

export const getCards = (windowSize) => {
    if (windowSize < 1280 && windowSize >= 768) {
        return WIDTH_TABLET;
    } else if (windowSize < 768 && windowSize >= 320) {
        return WIDTH_MOBILE;
    } else {
        return WIDTH_WIDESCREEN;
    }
};
