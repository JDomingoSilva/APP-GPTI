import React, { useState } from "react"

import TabSelector from "../components/home/TabSelector"
import SimulatorShile from "../components/home/SimulatorShile"
import SimulatorConsorcio from "../components/home/SimulatorConsorcio"

export default function Home() {
  const [selected, setSelected] = useState('');

  return (
    <div id="invisi-div">
      <div id="background-container" >
        <h1 id="site-title">
          Simulador de depósitos a plazo
        </h1>
        <div id="interfaz-container" >
          <TabSelector selected={selected} setSelected={setSelected} />

          <div id="separador" />

          {selected === "Shile" ? (
            <SimulatorShile />
          ) : (
            selected === "Consorcio" ? (
              <SimulatorConsorcio />
            ) : (
              <div className="empty-container">
                <h3> Seleccione un banco para simular </h3>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  )
}