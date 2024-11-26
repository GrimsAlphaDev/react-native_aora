import { getCurrentUser  } from "@/lib/appwrite";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: any | null;
    setUser: (value: any | null) => void;
    isLoading: boolean;
}

// Membuat context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


// Hook untuk menggunakan context
export const useGlobalContext = () => useContext(GlobalContext);

type ContextProviderProps = {
    children?: ReactNode
}

// Provider untuk context
export const GlobalProvider = ({ children }: ContextProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser ] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser ()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser (res);
                } else {
                    setIsLoggedIn(false);
                    setUser (null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }} >
                {children}
        </GlobalContext.Provider>
    );
};
