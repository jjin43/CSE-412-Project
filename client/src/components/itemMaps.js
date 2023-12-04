const bikeMap = new Map();
const miscMap = new Map();

class MapFunctions {
  constructor() {
    // Load basket state from localStorage or create new maps
    this.bikeMap = this.loadFromLocalStorage("bikeMap") || new Map();
    this.miscMap = this.loadFromLocalStorage("miscMap") || new Map();
    console.log("Basket initialized:", this.bikeMap, this.miscMap);
  }

  getBikeMap() {
    console.log("Getting bike map:", this.bikeMap);
    return this.bikeMap;
  }

  getMiscMap() {
    console.log("Getting misc map:", this.miscMap);
    return this.miscMap;
  }

  addToBikeMap(dataObj) {
    this.updateMap(this.bikeMap, dataObj);
  }

  addToMiscMap(dataObj) {
    this.updateMap(this.miscMap, dataObj);
  }

  removeFromBikeMap(dataObj) {
    this.removeMapEntry(this.bikeMap, dataObj);
  }

  removeFromMiscMap(dataObj) {
    this.removeMapEntry(this.miscMap, dataObj);
  }

  clearBikeMap() {
    this.clearMap(this.bikeMap);
  }

  clearMiscMap() {
    this.clearMap(this.miscMap);
  }

  updateMap(map, dataObj) {
    const count = map.get(dataObj) || 0;
    map.set(dataObj, count + 1);
    this.saveToLocalStorage(map, map === this.bikeMap ? "bikeMap" : "miscMap");
    console.log("Item added to map:", dataObj, map);
  }

  removeMapEntry(map, dataObj) {
    if (map.has(dataObj)) {
      map.delete(dataObj);
      this.saveToLocalStorage(
        map,
        map === this.bikeMap ? "bikeMap" : "miscMap"
      );
      console.log(`Item ${dataObj} removed from map.`, map);
    }
  }

  clearMap(map) {
    map.clear();
    this.saveToLocalStorage(map, map === this.bikeMap ? "bikeMap" : "miscMap");
    console.log("Map cleared.", map);
  }

  saveToLocalStorage(map, key) {
    const serializedMap = JSON.stringify(Array.from(map));
    localStorage.setItem(key, serializedMap);
    console.log("Map saved to localStorage:", map);
  }

  loadFromLocalStorage(key) {
    const serializedMap = localStorage.getItem(key);
    const map = serializedMap ? new Map(JSON.parse(serializedMap)) : null;
    console.log("Map loaded from localStorage:", map);
    return map;
  }
}

const basket = new MapFunctions();

export { basket };
