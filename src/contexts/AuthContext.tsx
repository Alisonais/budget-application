import { createContext, useState } from "react";

interface IAuthcontextValue {
  signedIn: boolean;
  setSigned: any
}

export const AuthContext = createContext({} as IAuthcontextValue);

export function AuthProvider({ children }:{children: React.ReactNode}) {

  const [signed, setSigned] = useState(false);

  const value: IAuthcontextValue = {
    signedIn: signed,
    setSigned
    }

  return(
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}
