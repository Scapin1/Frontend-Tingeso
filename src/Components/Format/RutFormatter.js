const formatRut = (value) => {
    if (!value) return "";

    // Elimina todo lo que no sea dígito o 'k'/'K'
    const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();

    // Si hay menos de 2 caracteres, aún no hay DV
    if (clean.length < 2) return clean;

    // Limita a máximo 8 dígitos + 1 DV
    const limited = clean.slice(0, 9);

    const body = limited.slice(0, -1);
    const dv = limited.slice(-1);

    // Formatea el cuerpo con puntos cada 3 dígitos desde el final
    const reversed = body.split("").reverse();
    const withDots = [];

    for (let i = 0; i < reversed.length; i++) {
        if (i > 0 && i % 3 === 0) {
            withDots.push(".");
        }
        withDots.push(reversed[i]);
    }

    const formattedBody = withDots.reverse().join("");

    return `${formattedBody}-${dv}`;
};


export default formatRut;