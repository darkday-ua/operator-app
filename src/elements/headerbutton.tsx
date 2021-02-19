import React from 'react';
import './headerbutton.css';
import '../common.css';
import {useContext } from "react";
import {AppStateContext} from '../state/appstate'
function HeaderButton(props:any) {
const appState = useContext(AppStateContext);    
  return (
    <div className={`HeaderButton-wrapper ${appState.theme} ${props.hidden?'hidden':''} HeaderButton-font-${props.size?props.size:''} `}
    onClick={props.onClick}>
      {props.buttonText||'...'}
    </div>
  );
}

export default HeaderButton;
