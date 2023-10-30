const CUSTOM_EVENT = 'ROUTE_CHANGE';

export const init = (onRouteChange) => {
    window.addEventListener(CUSTOM_EVENT, () => {
        onRouteChange();
    });
};

export const routeChange = (url, params) => {
    window.history.pushState(null, null, url);
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT, params));
};
