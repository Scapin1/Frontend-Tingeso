const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const cleaned = digits.replace(/^56/, "").replace(/^9/, "");
    let formatted = "+56 9";
    if (cleaned.length > 0) formatted += " " + cleaned.slice(0, 4);
    if (cleaned.length > 4) formatted += " " + cleaned.slice(4, 8);
    return formatted.trim();
};
export default formatPhoneNumber;