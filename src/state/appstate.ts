import React from 'react';
import {IModalContext} from '../interfaces';
export const AppStateContext = React.createContext(
    {
        theme: "",
        menuState: false,
        loggedUser:false,
        loggedUserData:{fio:'',id:-1}

    }
);


export const ModalStateContext = React.createContext(
    {        
        modalState: false,
        modalContext: {} as IModalContext,
        modalStatus:''
    }
);

export const LoginServiceContext = React.createContext<() => Promise<void>>(Promise.reject);