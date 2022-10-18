import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { CircularProgress } from '@mui/material';


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
  const [monto, setMonto] = useState(0);
  const [plazo, setPlazo] = useState(0);
  const [moneda, setMoneda] = useState("pesos");
  const [interest, setInterest] = useState(0);
  const [interestOnline, setInterestOnline] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [finalAmountOnline, setFinalAmountOnline] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [date, setDate] = useState(new Date());

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
    setDate(new Date());
    setLoading(true);
    axios.get(`https://app-gpti-backend.herokuapp.com/depositos`)
      .then((res) => {
        setInfo(res.data.rows);
      });
  }

  useEffect(() => {
    if (info.length > 0) {
      startQuery();
    }
  }, [info]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function addDays(date, days) {
    date.setDate(date.getDate() + parseInt(days));
    return date;
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  function startQuery() {
    let i = 1;
    while (true) {
      if (info[i].max_time >= plazo) {
        break;
      }
      i++;
    }

    let rate = info[i].interest_rate / 10000 + 1;
    let onlineRate = info[i].interest_rate_online / 10000 + 1;

    if (plazo % 30 === 0) {
      rate = rate ** (plazo / 30);
      onlineRate = onlineRate ** (plazo / 30);
    } else {
      let plazo_aux = plazo - (plazo % 30);
      rate = rate ** (plazo_aux / 30 + 1);
      onlineRate = onlineRate ** (plazo_aux / 30 + 1);
    }

    setInterest(rate);
    setInterestOnline(onlineRate);
    setFinalAmount(monto * rate);
    setFinalAmountOnline(monto * onlineRate);

    let date_aux = date;
    date_aux = addDays(date, plazo);
    date_aux.setHours(0, 0, 0, 0);
    date_aux = formatDate(date);
    
    setDate(date_aux);

    setShowInfo(true);
    setLoading(false);
  }

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
              <OutputDiv label="Tasa:" type="text" value={interest.toFixed(3)} />
              <OutputDiv label="Tasa online:" type="text" value={interestOnline.toFixed(3)} />
              <OutputDiv label="Intereses:" type="text" value={(monto * interest - monto).toFixed(3)} />
              <OutputDiv label="Intereses online:" type="text" value={(monto * interestOnline - monto).toFixed(3)} />
              <OutputDiv label="Monto final:" type="text" value={finalAmount.toFixed(3)} />
              <OutputDiv label="Monto final online:" type="text" value={finalAmountOnline.toFixed(3)} />
              <OutputDiv label="Fecha de pago:" type="text" value={date} />
            </div>
          ) : (
            <div />
          )
        )}
      </div>
    </div>
  )
}