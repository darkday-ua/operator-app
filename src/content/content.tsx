import React from 'react';
import { useState,useContext } from "react";
import {AppStateContext} from '../state/appstate'
import AppLabels from '../i18n/labels'
import './content.css'

function AppContent(props:any) {
  const appState = useContext(AppStateContext);
  return (
    <div className={`AppContent-wrapper ${appState.theme}`}>
        content

        content
        
    </div>
  );
}

export default AppContent;
