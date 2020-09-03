import React, {useState, createContext} from 'react';

export const LoadContext = createContext();

export const LoadProvider = ({children}) => {

    const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

    return (
        <LoadContext.Provider value={{
            isGlobalSpinnerOn, setGlobalSpinner

        }}>
            {children}
            </LoadContext.Provider>
    )
}