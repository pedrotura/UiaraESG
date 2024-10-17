function calcularMerdaSocorro(valor) {
    const IRPS = 0.015*valor;
    const CS = 0.01*valor;
    const COFINS = 0.03*valor;
    const PIS = 0.0065*valor;
    
    console.log(`IRPS: ${IRPS}`);
    console.log(`CSLL: ${CS}`);
    console.log(`caixão do caralho: ${COFINS}`);
    console.log(`PIS/PASEP: ${PIS}`);
    console.log(`----------------------------`);
}

calcularMerdaSocorro(2737.32);
calcularMerdaSocorro(111);
calcularMerdaSocorro(103.88);