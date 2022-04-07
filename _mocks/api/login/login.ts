// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

export const loginPostHandler = rest.post(
  `${import.meta.env.VITE_API_HOST}login`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json({}));
  }
);

export default loginPostHandler;
