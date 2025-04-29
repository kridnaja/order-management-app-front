import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthFeature from "../authentication/AuthFeature";
import SalesWorkPage from "../pages/SalesWorkPage";
import PrepressWorkPage from "../pages/PrepressWorkPage";
import AdminWorkPage from "../pages/AdminWorkPage";
import NewOrderPrintPage from "../pages/NewOrderPrintPage";
import ScannerPage from "../pages/ScannerPage";
import EditOrderPrintPage from "../pages/EditOrderPrintPage";
import ProductionPlanningWorkPage from "../pages/ProductionPlanningWorkPage";
import QueueDashbroad  from '../pages/QueueDashbroad'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthFeature />,
    children: [
      {
        path: "",
        element: <AuthFeature />,
      },
    ],
  },
  {
    path: "/",
    element: <SalesWorkPage />,
    children: [{ path: "salesWorkPage", element: <SalesWorkPage /> }],
  },
  {
    path: "/",
    element: <PrepressWorkPage />,
    children: [{ path: "prepressWorkPage", element: <PrepressWorkPage /> }],
  },
  {
    path: "/",
    element: <AdminWorkPage />,
    children: [{ path: "adminWorkPage", element: <AdminWorkPage /> }],
  },
  {
    path: "/",
    element: <NewOrderPrintPage />,
    children: [{ path: "newOrderPrintPage", element: <NewOrderPrintPage /> }],
  },
  {
    path: "/",
    element: <EditOrderPrintPage />,
    children: [{ path: "editOrderPrintPage", element: <EditOrderPrintPage /> }],
  },
  {
    path: "/",
    element: <ScannerPage />,
    children: [{ path: "scannerPage", element: <ScannerPage /> }],
  },
  {
    path: "/",
    element: <ProductionPlanningWorkPage />,
    children: [
      {
        path: "productionPlanningWorkPage",
        element: <ProductionPlanningWorkPage />,
      },
    ],
  },
  {
    path: "/",
    element: <QueueDashbroad />,
    children: [
      {
        path: "queueDashbroad",
        element: <QueueDashbroad />,
      },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
