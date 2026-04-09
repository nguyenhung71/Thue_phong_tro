import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  ForgotPassword,
  ResetPassword,
} from "./containers/public";
import { path } from "./ultils/contant";
import { categoryRoutes } from "./ultils/navigation";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          {categoryRoutes.map((item) => {
            const Component = item.element;
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
