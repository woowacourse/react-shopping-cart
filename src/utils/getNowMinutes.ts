export default function getNowMinutes() {
  const nowDate = new Date();
  return nowDate.getHours() * 60 + nowDate.getMinutes();
}
