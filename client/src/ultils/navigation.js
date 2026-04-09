import { path } from "./contant";
import apartment from "../containers/public/apartment";
import miniApartment from "../containers/public/miniApartment";
import servicedApartments from "../containers/public/servicedApartments";
import wholeHouse from "../containers/public/wholeHouse";

export const categoryRoutes = [
  {
    label: "Nhà nguyên căn",
    path: path.NHA_NGUYEN_CAN,
    element: wholeHouse,
  },
  {
    label: "Căn hộ dịch vụ",
    path: path.CAN_HO_DICH_VU,
    element: servicedApartments,
  },
  {
    label: "Căn hộ chung cư",
    path: path.CAN_HO_CHUNG_CU,
    element: apartment,
  },
  {
    label: "Căn hộ mini",
    path: path.CAN_HO_MINI,
    element: miniApartment,
  },
];

export const navigationItems = [
  {
    label: "Trang chủ",
    path: path.HOME,
  },
  ...categoryRoutes.map(({ label, path: routePath }) => ({
    label,
    path: routePath,
  })),
];
