const formatPesoCL = (value) => {
    if (value === undefined || value === null || isNaN(Number(value))) return "$0";
    return `$${Number(value).toLocaleString("es-CL", { minimumFractionDigits: 0 })}`;
};

export default formatPesoCL;

