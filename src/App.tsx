
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/Toster";
import { AuthProvider } from "./contexts/AuthContext";
import { Router } from "./Router";

export function App() {

  const queryclient = new QueryClient({
    defaultOptions:{
      queries: {
        staleTime: 5 * 60 * 1000, // 5minutos
        refetchOnWindowFocus: false,
        gcTime: 10 * 60 * 1000,  // 10 minutos
      }
    }
  });

  return (
    <QueryClientProvider client={queryclient}>
      <AuthProvider>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
