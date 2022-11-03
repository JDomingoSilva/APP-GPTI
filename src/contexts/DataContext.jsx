import React, {
  useContext, createContext, useState, useEffect, useMemo,
} from 'react';
import axios from 'axios';

import config from '../config';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataContextProvider({ children }) {
  const [b_estado_data, setEstadoData] = useState([]);
  const [b_consorcio_data, setConsorcioData] = useState([]);

  useEffect(() => {
    axios.get(`${config.BACK_URL}depositos`)
      .then((res) => {
        let all = res.data.rows;
        let estado = [];
        let consorcio = [];
        all.forEach((item) => {
          if (item.bank_name === 'Banco Estado') {
            estado.push(item);
          } else {
            consorcio.push(item);
          }
        });
        setEstadoData(estado);
        setConsorcioData(consorcio);
      });
  }, []);

  const banks_data = useMemo(
    () => ({
      b_estado_data, b_consorcio_data,
    }),
    [b_estado_data, b_consorcio_data],
  );

  return (
    <DataContext.Provider value={banks_data}>
      {children}
    </DataContext.Provider>
  );
}
