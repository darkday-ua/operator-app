import React from 'react';
import { useState,useContext } from "react";
import {AppStateContext} from '../state/appstate'
import AppLabels from '../i18n/labels'
import HeaderButton from '../elements/headerbutton';
import './header.css'

function AppHeader(props:any) {
  const appState = useContext(AppStateContext);
  return (
    <header className={`AppHeader-wrapper ${appState.theme}`}>
      <HeaderButton onClick={props.onMenuToggle} buttonText={AppLabels.buttons.menu}/>
      <HeaderButton onClick={props.onTasksTabClick} buttonText={AppLabels.buttons.tasks}/>
      <HeaderButton onClick={props.onProgramsTabClick} buttonText={AppLabels.buttons.programs}/>
      <HeaderButton onClick={props.onLogout} size={1} buttonText={appState.loggedUser?appState.loggedUserData.fio:AppLabels.buttons.logout_icon}/>
    </header>
  );
}

export default AppHeader;
