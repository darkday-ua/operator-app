import React from 'react';
import './menubutton.css'
import {useContext } from "react";
import {AppStateContext} from '../state/appstate'
function MenuButton(props:any) {
const appState = useContext(AppStateContext);    
  return (
    <header className={`MenuButton-wrapper ${appState.theme} ${props.hidden?'hidden':''}`}>
      Button
    </header>
  );
}

export default MenuButton;
