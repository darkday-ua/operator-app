import React from 'react';
import { useEffect,useState, useContext } from "react";
import Switch from "react-switch";
import { resourceLimits } from 'worker_threads';
import AppQRScanner from "../qrscanner/qrscanner";
import { ModalStateContext } from '../state/appstate';
import {ICredentials} from '../interfaces';
import './login.css';


function AppLogin(props: any) {
  const modalState = useContext(ModalStateContext);
  const [uN, setUN] = useState('');
  const [uP, setUP] = useState('');
  
  const [loginStatus, setStatus] = useState('');
  

  const handleResult=(result:any) => {      
      if (modalState.modalContext.handlers.handleResult)
        modalState.modalContext.handlers.handleResult(result)    
    };
  
  const UNChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUN(e.currentTarget.value);    
    handleResult({user:e.currentTarget.value,password:uP,qrToken:''} as ICredentials);
  }
  const UPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUP(e.currentTarget.value);
    handleResult({user:uN,password:e.currentTarget.value,qrToken:''} as ICredentials);
  }

  const [modeQR, switchMode] = useState(true);
  const switchLoginMode = () => { switchMode(!modeQR); setStatus(''); handleResult({} as ICredentials); };
  
  // BLOCK REGARDS TO QR SCAN MODE
  // SHOULD BE REWRITTEN ASYNC
  const scanResult = (result: any) => {
    if (result && result.status){
        handleResult({user:'',password:'',qrToken:result.qrToken} as ICredentials);
        modalState.modalContext.handlers.handleOk();
      }
    else if (result && !result.status) setStatus(`Error ${result.error}`);
    else setStatus(`Error reading QR`);    
  }
  // BLOCK REGARDS TO QR SCAN MODE
  
  return (
    <div className="AppLogin-wrapper">
      <div className="AppLogin-login">
        <div className={`AppLogin-Input ${!modeQR ? 'Hidden' : ''}`} >
          <AppQRScanner handleScanResult={scanResult} />
        </div>
        <div className={`AppLogin-Input-Cred ${modeQR ? 'Hidden' : ''}`} >
          <label>
            Користувач:
              <input type="text" value={uN} onChange={UNChange} />
          </label>
          <label>
            Пароль:
              <input type="password" value={uP} onChange={UPChange} />
          </label>
        </div>
      </div>
      <div className="AppLogin-switch-row">
        Логін/Пароль<Switch onChange={switchLoginMode} checked={modeQR} uncheckedIcon={false} checkedIcon={false} offColor={'#808080'} onColor={'#808080'}
          height={56} width={108} handleDiameter={50} className={"AppLogin-switch"} />QR код
    </div>
      <div className="AppLogin-status"><p>{loginStatus}</p><p>{modalState.modalStatus}</p></div>
    </div>
  );
}

export default AppLogin;
