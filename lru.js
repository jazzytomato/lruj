// Simple doubly linked list with just what we need
// Add
//  |  first                                     last
//  |   __            __            __            __
//  V  |  | --next-> |  | --next-> |  | --next-> |  |
//     |__| <-prev-- |__| <-prev-- |__| <-prev-- |__|

function LL() {
  this.first = null;
  this.last = null;
  this.size = 0;
}

LL.prototype.add = function(node) {
  node.next = this.first;
  node.prev = null;

  if (this.first === null) {
    this.last = node;
  } else {
    this.first.prev = node;
  }

  this.first = node;
  this.size++;
  return node;
}

LL.prototype.remove = function(node) {
  if (node.next !== null) {
    node.next.prev = node.prev;
  } else {
    this.last = node.prev;
  }

  if (node.prev !== null) {
    node.prev.next = node.next;    
  } else {
    this.first = node.next;
  }
  this.size--;
}

LL.prototype.moveToFirst = function(node) {
  this.remove(node);
  this.add(node);
}

LL.prototype.removeLast = function() {
  if (this.size === 0) {
    return;
  }
  this.remove(this.last);
}

function LRU(maxSize) {
    this.data = {};
    this.ll = new LL();
    this.maxSize = maxSize;
}

LRU.prototype.set = function(key, value) {
  if (key === undefined || value === undefined) {
    return;
  }

  if (this.data[key]) {
      this.data[key].value = value;
      // Not sure if we should move to first when updating an existing cache value
      this.ll.moveToFirst(this.data[key]);
  } else {
    let node = {value, key};
    this.data[key] = node;

    if (this.ll.size >= this.maxSize) {
      delete this.data[this.ll.last.key];
      this.ll.removeLast();
    }
    this.ll.add(node);
  }
};

LRU.prototype.get = function(key, getDataFn) {
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

module.exports = LRU;