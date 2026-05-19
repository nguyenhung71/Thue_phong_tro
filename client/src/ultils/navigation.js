import Rental from '../containers/public/Rental'

export const categoryRoutes = [
  { label: 'Nh\u00e0 nguy\u00ean c\u0103n', path: 'nha-nguyen-can', element: Rental },
  { label: 'C\u0103n h\u1ed9 d\u1ecbch v\u1ee5', path: 'can-ho-dich-vu', element: Rental },
  { label: 'C\u0103n h\u1ed9 chung c\u01b0', path: 'can-ho-chung-cu', element: Rental },
  { label: 'C\u0103n h\u1ed9 mini', path: 'can-ho-mini', element: Rental },
]

export const navigationItems = [
  { label: 'Trang ch\u1ee7', path: '/' },
  ...categoryRoutes.map(({ label, path: routePath }) => ({ label, path: `/${routePath}` })),
]
