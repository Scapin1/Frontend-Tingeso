

const formatRut = value => {
    // Elimina todo lo que no sea dígito o 'k'/'K'
    const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();

    if (clean.length === 0) return "";

    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);

    // Agrega puntos cada 3 dígitos desde el final
    const formattedBody = body
        .split("")
        .reverse()
        .reduce((acc, digit, i) => {
            return digit + (i > 0 && i % 3 === 0 ? "." : "") + acc;
        }, "");

    return `${formattedBody}-${dv}`;
};

export default formatRut;