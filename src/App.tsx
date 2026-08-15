
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
        staleTime: 10 * 60 * 1000, // 10 minutos
        refetchOnWindowFocus: false,
        gcTime: 11 * 60 * 1000,  // 11 minutos
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
