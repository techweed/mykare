import React, {Suspense} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AppRoutes from "./routes";
import AppSpinner from "./components/spinner";
import Login from "./pages/login";

const AppRouter = () => {
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
                <Component />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
