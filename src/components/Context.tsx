import React, { useContext, useState } from "react";
import { ValueProp, ContextProp } from "./types";
 
export const AppContext = React.createContext({} as ValueProp); //create the context API

export default function Context({ children }: ContextProp) {

    const isBrowserDefaultDark = ():boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

    const getDefaultTheme = (): string => {
        const localStorageTheme = localStorage.getItem('default-theme');
        const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
        return localStorageTheme || browserDefault;
      };

    const [ elementWidth , setElementWidth ] = useState<number | null>(null);
    const [ theme, setTheme ] = useState<string>(getDefaultTheme())
    const [ userId, setUserId ] = useState<string>('')

    return (
        <AppContext.Provider value={{ theme, setTheme, 
            elementWidth, setElementWidth, userId, setUserId}}>
            {children}
         </AppContext.Provider>
    )
}

export const useGlobalContext = ():ValueProp => {
    return useContext(AppContext);
}
