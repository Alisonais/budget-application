import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AllSteps } from "../AllSteps";
import { Login } from "../components/Login";
import { AuthGuard } from "./AuthGuard";

export function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={<AuthGuard isPrivite={false} />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<AuthGuard isPrivite />}>
          <Route path="/steppers" element={<AllSteps />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
