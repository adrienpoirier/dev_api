export function createLocalStorageVariable(key, value) {
    localStorage.setItem(key , value)
}

export function getLocalStorageVariable(key) {
    return localStorage.getItem(key)
}

export function removeLocalStorageVariable(key) {
    return localStorage.removeItem(key)
}