import { loginPostHandler } from "./api/login/login";
import { usersGetHandler } from "./api/users/users";

// List of api mocks to always load
export const handlers = [loginPostHandler, usersGetHandler];

// List of api mocks to only load if the VITE_LOCAL_MOCKS env is true
export const localHandlers = [usersGetHandler];

export const allHandlers = [...handlers, ...localHandlers];

export default handlers;
