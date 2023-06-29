export const getTime = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  
  return `${hours}:${minutes}`
}