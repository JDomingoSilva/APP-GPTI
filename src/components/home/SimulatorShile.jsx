import React, { useState, useEffect } from 'react';

import { CircularProgress } from '@mui/material';

const info_banco_estado = {
  "tasa": "5 %",
  "intereses": "50.000",
  "monto_final": "1.050.000",
  "fecha_pago": "30/12/2022",
}

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
        <input type={type} value={value} readonly />
      </div>
    </div>
  )
}

export default function Simulator() {
  const [monto, setMonto] = useState(0);
  const [plazo, setPlazo] = useState(0);
  const [moneda, setMoneda] = useState("pesos");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(info_banco_estado);
  const [showInfo, setShowInfo] = useState(false);

  const handleSetMonto = (event) => {
    setMonto(event.target.value);
  }

  const handleSetPlazo = (event) => {
    setPlazo(event.target.value);
  }

  const handleSetMoneda = (event) => {
    setMoneda(event.target.value);
  }

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowInfo(true);
    }, 1500);
  }

  useEffect(() => {
    if(showInfo){
      console.log("done");
    }
  }, [showInfo]);

  return(
    <div id="info-container" className="white-box">
      <div id="input-side">
        
        <div className="input-group">
          <label id="input-title">
            Moneda:
          </label>
          <select name="monedas" id="monedas" onChange={handleSetMoneda}>
            <option value="pesos">Pesos</option>
          </select>
        </div>

        <InputDiv label="Monto a invertir:" type="number" setValue={handleSetMonto} />

        <InputDiv label="Plazo:" type="date" setValue={handleSetPlazo} />
        
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
              <OutputDiv label="Tasa:" type="text" value={info.tasa} />
              <OutputDiv label="Intereses:" type="text" value={info.intereses} />
              <OutputDiv label="Monto final:" type="text" value={info.monto_final} />
              <OutputDiv label="Fecha de pago:" type="text" value={info.fecha_pago} />
            </div>
          ) : (
            <div />
          )
        )}
      </div>
    </div>
  )
}