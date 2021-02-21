import React from 'react';
import { useRef, useState, useContext, useEffect } from "react";
import { AppStateContext } from '../state/appstate'
import { ModalStateContext } from '../state/appstate'
import HeaderButton from '../elements/headerbutton'
import AppLogin from '../login/login'
import AppLabels from '../i18n/labels'
import './modal.css'
import '../common.css'
import '../interfaces'
import { IModalContext } from '../interfaces';

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                event.preventDefault();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export function OutsideAlerter(props: any) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef);

    return <div className="empty" ref={wrapperRef}>{props.children}</div>;
}

export const Modals = {
    settings: {
        title: AppLabels.buttons.settings,
        noCancel: false,
        buttonsText: [AppLabels.buttons.save, AppLabels.buttons.cancel],
        handlers:{},
        childContent: null
    } as IModalContext,
    help: {
        title: AppLabels.buttons.help,
        noCancel: true,
        buttonsText: [AppLabels.buttons.ok],
        handlers:{},
        childContent: null
    } as IModalContext,
    login: {
        title: AppLabels.buttons.logout,
        noCancel: false,
        buttonsText: [AppLabels.buttons.enter, AppLabels.buttons.cancel],
        handlers:{},
        childContent:(<AppLogin/>)
    },
    dict: {
        title: AppLabels.buttons.dict,
        noCancel: false,
        buttonsText: [AppLabels.buttons.ok, AppLabels.buttons.cancel],
        handlers:{},
        childContent: (<>Заглушка</>)
    } as IModalContext
}

function AppModal(props: any) {
    const appState = useContext(AppStateContext);
    const modalState = useContext(ModalStateContext);
    
    if (!modalState.modalState) return (<></>);
    else return (<OutsideAlerter>
        <div className="AppModal-wrapper">
            <div className={`AppModal-dialog shadow Modal-${appState.theme}`}>
                <div className="AppModal-title"> {modalState.modalContext.title}</div>
                <div className="AppModal-close" onClick={modalState.modalContext.handlers.handleCancel}>{AppLabels.buttons.close}</div>
                <div className="AppModal-content">
                    {modalState.modalContext.childContent}
                </div>

                <div className={`AppModal-buttons row-${modalState.modalContext.noCancel ? '1' : '2'}`}>
                    <div className="AppModal-button">
                        <HeaderButton
                            onClick={modalState.modalContext.handlers.handleOk}
                            buttonText={modalState.modalContext.buttonsText[0]}
                        ></HeaderButton>
                    </div>
                    <div className="AppModal-button">
                        <HeaderButton
                            onClick={modalState.modalContext.handlers.handleCancel}
                            buttonText={modalState.modalContext.buttonsText[1]}
                            hidden={modalState.modalContext.noCancel}
                        >
                        </HeaderButton>
                    </div>
                </div>

            </div>
        </div>
    </OutsideAlerter>);
}

export default AppModal;
