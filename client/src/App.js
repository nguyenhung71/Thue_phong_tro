import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  DetailPost,
  ForgotPassword,
  Home,
  Homepage,
  Login,
  Rental,
  ResetPassword,
  SearchDetail,
} from "./containers/public";
import { AccountInfo, ContactInfo, CreatePost, ManagePost, System } from "./containers/system";
import * as actions from "./store/actions";
import { path } from "./ultils/constant";
import { categoryRoutes } from "./ultils/navigation";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(actions.getCurrent());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, [dispatch]);

  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.SYSTEM} element={<System />}>
          <Route index element={<Navigate to={path.CREATE_POST} replace />} />
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POSTS} element={<ManagePost />} />
          <Route path={path.ACCOUNT_INFO} element={<AccountInfo />} />
          <Route path={path.EDIT_ACCOUNT} element={<AccountInfo />} />
          <Route path={path.EDIT_POST} element={<CreatePost />} />
          <Route path={path.CONTACT} element={<ContactInfo />} />
        </Route>
        <Route path={path.HOME} element={<Home />}>
          <Route index element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path="chi-tiet/*" element={<DetailPost />} />
          {categoryRoutes.map((item) => {
            const Component = item.element;
            return <Route key={item.path} path={item.path} element={<Component />} />;
          })}
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
