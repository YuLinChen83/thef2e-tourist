import jsSHA from "jssha";

export const fetcher = (url: string, options: RequestInit = {}) => fetch("https://ptx.transportdata.tw/MOTC" + url, { ...options, headers: { ...options?.headers, ...getAuthorizationHeader() } }).then(res => res.json());

const getAuthorizationHeader = () => {
    let UTCString = new Date().toUTCString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(import.meta.env.VITE_APP_KEY, 'TEXT');
    ShaObj.update('x-date: ' + UTCString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + import.meta.env.VITE_APP_ID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': UTCString };
}