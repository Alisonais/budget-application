import { useAuth } from "@/hooks/useAuth";
import { motion } from "motion/react";
import { Navigate, Outlet } from "react-router-dom";


export function AuthGuard({ isPrivite }: { isPrivite: boolean }) {

  const { signedIn } = useAuth();

  if (signedIn && !isPrivite) {
    return <Navigate to='/steppers' replace />
  }

  if (!signedIn && isPrivite) {
    return <Navigate to='/' replace />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,
      }}
    >
      <Outlet />
    </motion.div>

  );
}
