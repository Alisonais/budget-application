import { AllSteps } from "@/pages/AllSteps";
import { ConfirmationCode } from "@/pages/auth/ConfirmationCode";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Basecoats } from "@/pages/Basecoats";
import { Dashboard } from "@/pages/Dashboard";
import { ListBudget } from "@/pages/ListBudget";
import { AnimatePresence } from "motion/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";


export function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={<AuthGuard isPrivite={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation-code" element={<ConfirmationCode />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard isPrivite />}>
          <Route path="/budgets" element={<ListBudget />} />
          <Route path="/basecoats" element={<Basecoats />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/steppers" element={<AllSteps />} />
        </Route>

        <Route path="*" element={<Navigate to='/login' />} />
      </Routes>
    </AnimatePresence>
  );
}
