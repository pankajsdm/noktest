export function encodeParams(p: any): string {
    return Object.entries(p).map(kv => kv.map(encodeURIComponent).join(`=`)).join(`&`)
}