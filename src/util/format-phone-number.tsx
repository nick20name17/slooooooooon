export const formatPhoneNumber = (input: string) => {
    const numbersOnly = input.replace(/\D/g, "");

    return numbersOnly.replace(
        /^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
        "+$1 $2 $3 $4 $5"
    );
};
