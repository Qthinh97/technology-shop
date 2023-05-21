export const ROUTES = {
  USER: {
    HOME: "/",
    PRODUCT_LIST: "/products",
    PRODUCT_BY_CATEGORY: "/product/:categoryId",
    CART_LIST: "/cart",
    DETAIL: "/detail/:id",
    CHECKOUT: "/checkout",
    BUILDPC: "/buildPC",
    SEARCH: "/products?q=:key",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCT_MANAGEMENT: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
  },
  ACCOUNT: {
    ACCOUNTINFO: "/account/accountInfo",
    ODERHISTORY: "/account/oderHistory",
  },
  LOGIN: "/login",
  REGISTER: "/register",
};
