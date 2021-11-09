import jsSHA from 'jssha';

export const fetcher = (url: string, options: RequestInit = {}) =>
  fetch('https://ptx.transportdata.tw/MOTC' + url, {
    ...options,
    headers: { ...options?.headers, ...getAuthorizationHeader() },
  }).then((res) => res.json());

const getAuthorizationHeader = () => {
  let UTCString = new Date().toUTCString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(import.meta.env.VITE_APP_KEY, 'TEXT');
  ShaObj.update('x-date: ' + UTCString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization =
    'hmac username="' +
    import.meta.env.VITE_APP_ID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, 'X-Date': UTCString };
};

export const getCardInfo = (item) => ({
  id: item.ID,
  name: item.Name,
  picture: item.Picture.PictureUrl1,
  city: item.City,
  OpenTime:
    item.OpenTime ===
      'Sun 24 hours；Mon 24 hours；Tue 24 hours；Wed 24 hours；Thu 24 hours；Fri 24 hours；Sat 24 hours' ||
    '全天'
      ? '全天候開放'
      : item.OpenTime,
  category1: item.Class1,
  category2: item.Class2,
  category3: item.Class3,
  star: +(Math.random() * 5).toFixed(1),
});
