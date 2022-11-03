import React from "react"

import Simulator from "../components/home/Simulator"

export default function Home() {

  return (
    <div id="invisi-div">
      <div id="background-container" >
        <h1 id="site-title">
          Simulador de depósitos a plazo
        </h1>
        <div id="interfaz-container" >
          <Simulator />
        </div>
      </div>
    </div>
  )
}