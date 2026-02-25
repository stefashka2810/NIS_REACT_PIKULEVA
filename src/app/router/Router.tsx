import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LoginPage from "../../pages/auth/login/LoginPage.tsx";
import RegisterPage from "../../pages/auth/register/RegisterPage.tsx";
import Dashboard from "../../pages/dashboard/Dashboard.tsx";
import ProfilePage from "../../pages/profile/ProfilePage.tsx";
import ProductsPage from "../../pages/products/ProductsPage.tsx";
import Settings from "../../pages/settings/Settings.tsx";
import NotFound from "../../pages/notFound/NotFound.tsx";
import LogoutPage from "../../pages/logout/LogoutPage.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import Layout from "../../shared/ui/Layout.tsx";
import ProductPage from "../../pages/product/ProductPage.tsx";
import type { User } from "../../entities/user/model/types.ts";

const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("AppRouter: isAuth =", isAuth, ", user =", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/register"} element={<RegisterPage />}></Route>
        <Route path={"/logout"} element={<LogoutPage />}></Route>
        <Route element={<ProtectedRoutes isAuth={isAuth} user={user} />}>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path={"/profile"} element={<ProfilePage />}></Route>
            <Route path={"/products"} element={<ProductsPage />}></Route>
            <Route path={"/products/:id"} element={<ProductPage />}></Route>
            <Route path={"/settings"} element={<Settings />}></Route>
          </Route>
        </Route>
        <Route path={"*"} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

function ProtectedRoutes({
  isAuth,
  user,
}: {
  isAuth: boolean;
  user: Partial<User> | null;
}) {
  if (!isAuth && !user) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return <Outlet />;
}

export default AppRouter;
