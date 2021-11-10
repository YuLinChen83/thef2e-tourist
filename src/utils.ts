const isAllDay = (item) =>
  item.OpenTime ===
  'Sun 24 hours；Mon 24 hours；Tue 24 hours；Wed 24 hours；Thu 24 hours；Fri 24 hours；Sat 24 hours' ||
  '全天';

export const getCardInfo = (item) => ({
  id: item.ID,
  name: item.Name,
  picture: item.Picture.PictureUrl1,
  city: item.City,
  OpenTime: isAllDay(item) ? '全天候開放' : item.OpenTime,
  category1: item.Class1,
  category2: item.Class2,
  category3: item.Class3,
  star: +(Math.random() * 5).toFixed(1),
});
