export const ROUTES = {
  USER: {
    HOME: "/",
    PRODUCT_LIST: "/products",
    PRODUCT_BY_CATEGORY: "/product/:categoryId",
    CART_LIST: "/cart",
    DETAIL: "/detail/:id",
    CHECKOUT: "/checkout",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCT_MANAGEMENT: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
  },
  LOGIN: "/login",
  REGISTER: "/register",
};
