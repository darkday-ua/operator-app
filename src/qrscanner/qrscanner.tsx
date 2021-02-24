import React from 'react';
import { useState } from "react";
import './qrscanner.css';
import {IQRScanResult} from '../interfaces';
import QrReader from 'react-qr-reader';

function AppQRScanner(props:any) { 

  const handleScan = (data:any) => {
    if (data) {
      const result = ({status:true,qrToken:data,error:'Some mock error'});
      props.handleScanResult(result);
    }
  }

  const handleError = (error:any) => {
    props.handleScanResult({status:false,qrToken:null,error:error as string}as IQRScanResult); 
  }
 
    return (
      <div>
        <QrReader
          facingMode={'environment'}
          delay={2000}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
    )
}

export default AppQRScanner;
