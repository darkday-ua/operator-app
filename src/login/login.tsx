import React from 'react';
import { useState,useContext } from "react";
import Switch from "react-switch";
import AppQRScanner from "../qrscanner/qrscanner";
import './login.css';


function AppLogin(props:any) {
  
  const [uN, setUN] = useState('');
  const [uP, setUP] = useState('');

  const UNChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUN(e.currentTarget.value);
  }
  const UPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUP(e.currentTarget.value);
  }

  const [modeQR, switchMode] = useState(true);
  const switchLoginMode = () => { switchMode(!modeQR); };
  const scanResult = (result: any) => {
    if (result && result.status) alert('succes QR login!');
    else if (result && !result.status) alert('Error ' + result.error)
    else alert('Error reading QR');
  }
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
    </div>
  );
}

export default AppLogin;
