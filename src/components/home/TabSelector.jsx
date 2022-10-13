import React from 'react';

import LogoEstado from '../../images/estado.png';
import LogoConsorcio from '../../images/consorcio.png';

function TabImage(props) {
  const { src, alt, setSelected, selected } = props;
  if (selected === alt) {
    return (
      <div className="img-container">
        <img src={src} alt={alt} className="tab-image" id="selected" />
      </div>
    );
  }
  return (
    <div className="img-container" onClick={() => setSelected(alt)}>
      <img src={src} alt={alt} className="tab-image" />
    </div>
  );
}

export default function TabSelector(props) {
  const { selected, setSelected } = props;

  return (
    <div id="tab-selector" className="white-box" >
      <div id="tab-selector-left" className="tab-selector-item">
        <TabImage src={LogoEstado} alt="Shile" setSelected={setSelected} selected={selected} />
      </div>
      <div id="tab-selector-right" className="tab-selector-item">
        <TabImage src={LogoConsorcio} alt="Consorcio" setSelected={setSelected} selected={selected} />
      </div>
    </div>
  );
}