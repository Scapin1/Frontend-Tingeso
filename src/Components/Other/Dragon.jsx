import React from 'react';

const Dragon = () => (
    <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Stylized Black and White Dragon"
        style={{ maxWidth: '100%', height: 'auto' }}
    >
        {/* Cabeza */}
        <path
            d="M400,150 C420,130 440,130 460,150 C480,170 470,190 450,200 C430,210 410,190 400,150 Z"
            fill="#000"
        />
        {/* Cuernos */}
        <path d="M410,140 L405,110" stroke="#fff" strokeWidth="4" />
        <path d="M450,140 L455,110" stroke="#fff" strokeWidth="4" />

        {/* Ojo */}
        <circle cx="445" cy="160" r="8" fill="#fff" />
        <circle cx="445" cy="160" r="4" fill="#000" />

        {/* Cuerpo */}
        <path
            d="M300,300 C350,250 450,250 500,300 C550,350 500,450 400,450 C300,450 250,400 250,350 C250,320 270,310 300,300 Z"
            fill="#000"
        />

        {/* Ala izquierda */}
        <path
            d="M320,280 Q280,200 360,220 Q440,240 400,280 Z"
            fill="#111"
            stroke="#fff"
            strokeWidth="2"
        />

        {/* Garras */}
        <path d="M370,450 L360,470" stroke="#fff" strokeWidth="4" />
        <path d="M390,450 L380,470" stroke="#fff" strokeWidth="4" />

        {/* Cola */}
        <path
            d="M250,350 Q200,400 220,460 Q240,520 300,500"
            fill="none"
            stroke="#000"
            strokeWidth="6"
        />
        <path
            d="M300,500 L290,490 L310,490 Z"
            fill="#000"
        />
    </svg>
);

export default Dragon;