//Round prices to 2 decimals 
export const round2Decimal = (num: number) => 
Math.round((num + Number.EPSILON) * 100) / 100