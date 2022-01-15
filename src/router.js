import React, {Suspense} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AppRoutes from "./routes";
import AppSpinner from "./components/spinner";
import Login from "./pages/login";

const AppRouter = () => {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {AppRoutes.map(({component: Component, path, ...rest}) => (
          <Route
            {...rest}
            key={path}
            path={path}
            element={
              <Suspense fallback={<AppSpinner />}>
                {isLoggedIn ? <Component /> : <Navigate to="/" />}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
