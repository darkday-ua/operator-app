import React from 'react';
import { useState } from "react";
import './qrscanner.css';
import {IQRScanResult} from '../interfaces'

async function externalScanFunction(){
  return new Promise(
    resolve => 
     setTimeout(()=>{
      console.log('sending mock value on 2sec timer'); 
      resolve ({status:true,qrToken:'Some mock token',error:'Some mock error'});
    },2000)    
     );
    

}

function AppQRScanner(props:any) {    
  const returnScanResult =  async ()=>{
    console.log('rsr function');
      try{
        const  result= await externalScanFunction();
        props.handleScanResult(result);
      }
      catch(error){
        console.log('error',error);
        props.handleScanResult({status:false,qrToken:null,error:error as string}as IQRScanResult); 
      }
  }
    return (
    <div onClick={returnScanResult} className="QRScanner-mock">
        Place for QR Scanner. Click to init mock result.
    </div>
  );
}

export default AppQRScanner;
