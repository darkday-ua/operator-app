import React from 'react';
import { useState, useContext } from "react";
import {AppStateContext} from '../state/appstate'
import {ModalStateContext} from '../state/appstate'
import HeaderButton from '../elements/headerbutton'
import AppLabels from '../i18n/labels'
import './modal.css'
import '../common.css'
import '../interfaces'
import { IModalContext } from '../interfaces';



export const Modals = {
    settings: {
        title: AppLabels.buttons.settings,
        noCancel: false,
        buttonsText: [AppLabels.buttons.save,AppLabels.buttons.cancel],
        handleOk: null,
        handleCancel: null,
        childContent: null
    } as IModalContext,
    help: {
        title: AppLabels.buttons.help,
        noCancel: true,
        buttonsText: [AppLabels.buttons.ok],
        handleOk: null,
        handleCancel: null,
        childContent: null
    } as IModalContext,
    login: {
        title: AppLabels.buttons.logout,
        noCancel: false,
        buttonsText: [AppLabels.buttons.enter,AppLabels.buttons.cancel],
        handleOk: null,
        handleCancel: null,
        childContent: null
    },
    dict: {
        title: AppLabels.buttons.dict,
        noCancel: false,
        buttonsText: [AppLabels.buttons.ok,AppLabels.buttons.cancel],
        handleOk: null,
        handleCancel: null,
        childContent: (<>Заглушка</>)
    } as IModalContext
}

function AppModal(props: any) {
    const appState = useContext(AppStateContext);
    const modalState = useContext(ModalStateContext);
    const handleOk=modalState.modalContext.handleOk;
    const handleCancel=modalState.modalContext.handleCancel;
    if (!modalState.modalState) return (<></>);
    else return (
        <div className={`AppModal-wrapper shadow Modal-${appState.theme}`}>
            <div className="AppModal-title"> {modalState.modalContext.title}</div>
            <div className="AppModal-close" onClick={modalState.modalContext.handleCancel}>{AppLabels.buttons.close}</div>
            <div className="AppModal-content">          
                    {modalState.modalContext.childContent}
            </div>

            <div className={`AppModal-buttons row-${modalState.modalContext.noCancel ? '1' : '2'}`}>
                <div className="AppModal-button">
                    <HeaderButton
                        onClick={modalState.modalContext.handleCancel}
                        buttonText={modalState.modalContext.buttonsText[0]}
                    ></HeaderButton>
                </div>
                <div className="AppModal-button">
                    <HeaderButton
                        onClick={modalState.modalContext.handleCancel}
                        buttonText={modalState.modalContext.buttonsText[1]}
                        hidden={modalState.modalContext.noCancel}
                    >
                    </HeaderButton>
                </div>
            </div>

        </div>
    );
}

export default AppModal;
