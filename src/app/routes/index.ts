import { Router } from "express";

export const router = Router();

const moduleRoutes = [
  {
    path: "/example",
    route: example,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
