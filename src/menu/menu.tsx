import React from 'react';
import { useState,useContext } from "react";
import './menu.css';
import '../common.css';
import {AppStateContext} from '../state/appstate'
import AppLabels from '../i18n/labels'

function AppMenu(props:any) {
    const appState = useContext(AppStateContext);    
  return (
    <div className={`AppMenu-wrapper shadow Modal-${appState.theme} ${appState.menuState?'':'hidden'}` }>
        <div className="AppMenu-close" onClick={props.onMenuClose}>{AppLabels.buttons.close}</div>
        <div className="AppMenu-element" onClick={props.onLogoutClick}>{AppLabels.buttons.logout}</div>
        <div className="AppMenu-element" onClick={props.onDictClick}>{AppLabels.buttons.dict}</div>
        <div className="AppMenu-element" onClick={props.onHelpClick}>{AppLabels.buttons.help}</div>
        <div className="AppMenu-element"onClick={props.onSettingsClick}>{AppLabels.buttons.settings}</div>
        <div className="AppMenu-element"onClick={props.onFontClick}>{AppLabels.buttons.font}</div>
        <div className="AppMenu-element"onClick={props.onThemeClick}>{AppLabels.buttons.theme}</div>
    </div>
  );
}

export default AppMenu;
