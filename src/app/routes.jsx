import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import Login from "../features/auth/Login";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../features/dashboard/Dashboard";
import Accounts from "../features/accounts/Accounts";
import AccountsDetails from "../features/accounts/AccountsDetails";
import Transactions from "../features/transactions/Transactions";
import Beneficiaries from "../features/beneficiaries/beneficiaries";
import Payments from "../features/payments/Payments";
import Cards from "../features/cards/Cards";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    // element: <ProtectedRoute />,
    elemnt: <AppLayout />,
    children: [{ element: <AppLayout />,
        children:[
          {path: "/dashboard",element: <Dashboard />},
          {path: "/accounts", element: <Accounts />},
          {path: "/accounts/:accountId", element: <AccountsDetails/>},  
          {path: "/transactions", element: <Transactions />},
          {path:"/payments", element: <Payments />},
          {path:"/beneficiaries", element: <Beneficiaries/>},
          {path:"/cards", element: <Cards />}
        ]
     }]
    },]);
// Start with feature-based routing
export default router;
