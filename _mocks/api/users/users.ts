/* eslint-disable import/no-extraneous-dependencies */
import { PathParams, rest } from "msw";

import { Users } from "@/models/users.types";
import users from "./users.json";

export const usersGetHandler = rest.get<object, PathParams, Users>(
  `${import.meta.env.VITE_API_HOST}users`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(users));
  }
);

export default usersGetHandler;
