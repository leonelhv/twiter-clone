export function saveToLocalStore<T> (key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStore<T> (key: string): T | null {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as T;
  }
  return null;
}

export function removeFromLocalStore (key: string) {
  localStorage.removeItem(key);
}