export function loadFromLocalStorage() {
  try {
    const data = window.localStorage.getItem("favorites");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading favorites");
  }
}
export function saveToLocalStorage(data) {
  try {
    window.localStorage.setItem("favorites", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving favorties to local storage", error);
  }
}
