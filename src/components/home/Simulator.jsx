import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useData } from '../../contexts/DataContext';
import winnerBank from '../../helpers/query_funcs';


function InputDiv(props) {
  const { label, type, handleChange } = props;

  return( 
    <div className="input-group">
      <h3 id="title">
        {label}
      </h3>
      <div className="input-container">
        <input type={type} onChange={handleChange} />
      </div>
    </div>
  )
}

function OutputDiv(props) {
  const { label, type, value } = props;

  return( 
    <div className="input-group">
      <h3 id="title">
        {label}
      </h3>
      <div className="input-container">
        <input type={type} value={value} readOnly />
      </div>
    </div>
  )
}

export default function Simulator() {
  const { b_estado_data, b_consorcio_data } = useData();
  const banks = [
    { name: 'Banco Estado', data: b_estado_data },
    { name: 'Banco Consorcio', data: b_consorcio_data },
  ]

  const [monto, setMonto] = useState(0);
  const [plazo, setPlazo] = useState(0);
  const [output, setOutput] = useState({
    bank_name: '',
    offlineRate: 0,
    onlineRate: 0,
    offlineSum: 0,
    onlineSum: 0,
    pay_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleSetMonto = (event) => {
    setMonto(event.target.value);
  }

  const handleSetPlazo = (event) => {
    setPlazo(event.target.value);
  }

  const handleSubmit = () => {
    console.log(b_estado_data);
    setLoading(true);
    setOutput(winnerBank(banks, monto, plazo));
    setLoading(false);
    setShowInfo(true);
  }

  return(
    <div id="info-container" className="white-box">
      <div id="input-side">

        <InputDiv label="Monto a invertir:" type="number" handleChange={handleSetMonto} />

        <InputDiv label="Plazo (7 - 365 días):" type="number" handleChange={handleSetPlazo} />
        
        <div className="button-container">
          <button type="button" className="no-style" onClick={handleSubmit} >
            Simular
          </button>
        </div>
      </div>
      
      <div id="output-side">
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : (
          showInfo ? (
            <div id="output-side">
              <OutputDiv label="Mejor opción de banco:" type="text" value={
                output.bank_name
              } />
              <OutputDiv label="Tasa:" type="text" value={
                output.offlineRate.toFixed(3)
              } />
              <OutputDiv label="Tasa online:" type="text" value={
                output.onlineRate.toFixed(3)
              } />
              <OutputDiv label="Intereses:" type="text" value={
                (monto * (output.offlineRate - 1)).toFixed(3)
              } />
              <OutputDiv label="Intereses online:" type="text" value={
                (monto * (output.onlineRate - 1)).toFixed(3)
              } />
              <OutputDiv label="Monto final:" type="text" value={
                output.offlineSum.toFixed(3)
              } />
              <OutputDiv label="Monto final online:" type="text" value={
                output.onlineSum.toFixed(3)
              } />
              <OutputDiv label="Fecha de pago:" type="text" value={
                output.pay_date
              } />
            </div>
          ) : (
            <div />
          )
        )}
      </div>
    </div>
  )
}