const lru = require('./lru.js')

describe('LRU', () => {
  var cache = new lru(5);
  cache.set('1', 'data 1');
  cache.set('2', 'data 2');
  cache.set('3', 'data 3');
  cache.set('4', 'data 4');
  cache.set('5', 'data 5');
  cache.set('6', 'data 6');

  it('works', () => {
    expect(cache.size).toEqual(5);
    expect(cache.get('6')).toEqual('data 6');
    expect(cache.get('1')).toEqual(undefined);
    expect(cache.get('99', () => 'data 99')).toEqual('data 99');
  })
});
