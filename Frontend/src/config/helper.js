export const getToken = () => {
  return localStorage.getItem("token");
};
export const getUser=()=>{
    return JSON.parse(localStorage.getItem('user'))
}
export const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
