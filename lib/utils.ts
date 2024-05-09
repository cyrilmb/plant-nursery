//Round prices to 2 decimals 
export const round2Decimal = (num: number) => 
Math.round((num + Number.EPSILON) * 100) / 100

export function convertDocToObj(doc: any) {
    doc._id = doc._id.toString()
    return doc
}