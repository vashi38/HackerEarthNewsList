// @ts-check

class localStore {
  constructor(data) {
    this.data = data;
  }
  getCount() {
    return this.data.length;
  }
  getData(from, to) {
    return this.data.slice(from, to + 1);
  }
}

module.exports = localStore;
