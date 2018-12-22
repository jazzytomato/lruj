// Simple doubly linked list with just what we need
// Add
//  |  first                        last
//  |   __            __            __
//  V  |  | --next-> |  | --next-> |  |
//     |__| <-prev-- |__| <-prev-- |__|

function ll() {
  this.first = null;
  this.last = null;
}

ll.prototype.add = function(node) {
  node.next = this.first;
  node.prev = null;

  if (this.first === null) {
    this.last = node;
  } else {
    this.first.prev = node;
  }

  this.first = node;
  return node;
}

ll.prototype.moveToFirst = function(node) {
  if (this.first === node) {
    return;
  }

  node.prev = null;
  this.first.prev = node;
  this.first = node
}

ll.prototype.removeLast = function() {
  if (this.first === this.last) {
    this.first = null;
    this.last = null
  } else {
    this.last = this.last.prev;
    this.last.next = null;
  }
}

function lru(maxSize) {
    this.size = 0;
    this.data = {};
    this.ll = new ll();
    this.maxSize = maxSize;
}

lru.prototype.set = function(key, value) {
  if (this.data[key]) {
      this.data[key].value = value;
      this.ll.moveToFirst(this.data[key])
  } else {
    let node = {value, key};
    this.data[key] = node;

    if (this.size >= this.maxSize) {
      delete this.data[this.ll.last.key];
      this.ll.removeLast();
    }
    this.ll.add(node);
  }
  if (this.size < this.maxSize) {
    this.size++;
  }
};

lru.prototype.get = function(key, getDataFn) {
  if (this.data[key]) {
      const node = this.data[key];
      this.ll.moveToFirst(node);
      return node.value;
  } else if(typeof getDataFn === "function") {
    const value = getDataFn();
    this.set(key, value);
    return value;
  }
};

module.exports = lru;