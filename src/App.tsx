// import { Stepper } from "./components/Stepper";
// import { BudgetData } from "./components/steps/BudgetData";
// import { CarData } from "./components/steps/CarData";
// import { PaymentData } from "./components/steps/PaymentData";
// import { PersonalData } from "./components/steps/PersonalData";
// import { Review } from "./components/steps/Review";


import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Router } from "./Router";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>


  )
}
