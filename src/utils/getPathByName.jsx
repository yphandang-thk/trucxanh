import routes from '../routes/router.js';

export const getPathByName = (name) => {
    const route = routes.find(route => route.name === name);
    return route ? route.path : '';
};