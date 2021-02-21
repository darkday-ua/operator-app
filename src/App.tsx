import React from "react";
import { useState } from "react";
import "./App.css";
import "./common.css";
import { IModalContext,ICredentials } from "./interfaces";
import { AppStateContext, ModalStateContext } from "./state/appstate";
import {httpPost} from './service/http'
import {urls} from './service/config'

import AppHeader from "./header/header";
import AppMenu from "./menu/menu";
import AppLogin from "./login/login";
import AppContent from "./content/content";
import AppModal, { Modals } from "./modal/modal";

const fontSizes: number[] = [1, 2, 3, 4, 5];
const baseFontSize: number = fontSizes[3];
const THEMES = { DARK: "dark", LIGHT: "light" };

// ------------ mock
const isUserLogged = true;
const loggedUserData = { fio: "Несправжній Віктор", id: 666 };
//--------------

function App() {
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [menuState, setMenuState] = useState(false);
  const [modalState, setmodalState] = useState(false);
  const [modalContext, setModalContext] = useState({} as IModalContext);
  const [primaryFontSize, setFontSize] = useState(baseFontSize);
  const [modalStatus, setmodalStatus] = useState('');
  //const [credentials,setCredentials]=useState({} as ICredentials);
  let credentials = {} as ICredentials;

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const toggleTheme = () => {
    theme === THEMES.DARK ? setTheme(THEMES.LIGHT) : setTheme(THEMES.DARK);
  };

  const toggleFontSize = () => {
    primaryFontSize < fontSizes.length
      ? setFontSize(primaryFontSize + 1)
      : setFontSize(1);
  };

  const destroyModal = () => {
    setmodalState(false);
  };

  const processLogin = async (result: any) => {
    let loginResult:any=null;
    if (credentials.qrToken) 
      {
        setmodalStatus("proceed login with QRToken " + credentials.qrToken);
      loginResult = await httpPost(urls.qr_login,JSON.stringify({qr_token:credentials.qrToken}),'');        
      }
    else {     
      setmodalStatus("proceed login with Credentials " + credentials.user + " " + credentials.password);
      loginResult = await httpPost(urls.login,JSON.stringify({login:credentials.user,password:credentials.password}),'');
    }
    console.log(loginResult);
  };

  const handleResult = (result: ICredentials) => {
    //setCredentials(result as ICredentials);
    credentials=result;    
    setmodalStatus('');
  };

const createModal = (
  context: IModalContext,
  handleOk: any,
  handleCancel: any
) => {
  setMenuState(false);
  context.handlers.handleCancel = handleCancel;
  context.handlers.handleOk = handleOk;
  context.handlers.handleResult= handleResult;
  setModalContext(context);
  setmodalState(true);
};
const programsTab = () => { };
const tasksTab = () => { };
const loginPage = () => {
  createModal(Modals.login, processLogin, destroyModal);
};
const settingsPage = () => {
  createModal(Modals.settings, destroyModal, destroyModal);
};
const dictPage = () => {
  createModal(Modals.dict, destroyModal, destroyModal);
};
const helpPage = () => {
  createModal(Modals.help, destroyModal, destroyModal);
};

return (
  <AppStateContext.Provider
    value={{ theme, menuState, loggedUser: isUserLogged, loggedUserData }}
  >
    <div className={`OperatorApp-wrapper font-${primaryFontSize} ${theme}`}>
      <AppHeader
        onLogout={loginPage}
        onMenuToggle={toggleMenu}
        onProgramsTabClick={programsTab}
        onTasksTabClick={tasksTab}
      />

      <ModalStateContext.Provider value={{ modalState, modalContext,modalStatus }}>
        <AppModal></AppModal>
      </ModalStateContext.Provider>
      <AppMenu
        onMenuClose={toggleMenu}
        onThemeClick={toggleTheme}
        onLogoutClick={loginPage}
        onHelpClick={helpPage}
        onDictClick={dictPage}
        onFontClick={toggleFontSize}
        onSettingsClick={settingsPage}
      />
    </div>
  </AppStateContext.Provider>
);
}

export default App;
