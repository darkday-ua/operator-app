import React from 'react';
import { useState } from "react";
import './qrscanner.css';

const externalScanFunction=()=>{
    return {status:false,qrToken:'Some mock token',error:'Some mock error'};
}

function AppQRScanner(props:any) {    
  const returnScanResult= ()=>{
      const result = externalScanFunction();
      props.handleScanResult(result);
  }
    return (
    <div onClick={returnScanResult}>
        Place for QR Scanner. Click to init mock result.
    </div>
  );
}

export default AppQRScanner;
