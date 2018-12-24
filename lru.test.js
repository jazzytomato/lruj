const LRU = require('./lru.js')

describe('LRU', () => {
  describe('set', () => {
    it('updates the cache size', () => {
      var cache = new LRU(5);
      expect(cache.ll.size).toEqual(0);
      cache.set(1, 'data 1');
      expect(cache.ll.size).toEqual(1);
    });

    it('drops least recently used items based on maxSize', () => {
      const maxSize = 3;
      var cache = new LRU(maxSize);
      cache.set(1, 'data 1');
      cache.set(2, 'data 2');
      cache.set(3, 'data 3');
      cache.set(4, 'data 4');
      cache.set(5, 'data 5');

      expect(cache.ll.size).toEqual(3);
      const cacheDataSize = Object.keys(cache.data).length
      expect(cacheDataSize).toEqual(3);
      expect(cache.ll.first.value).toEqual('data 5');
      expect(cache.ll.last.value).toEqual('data 3');

      expect(cache.get(1)).toEqual(undefined);
      expect(cache.get(2)).toEqual(undefined);
      expect(cache.get(3)).toEqual('data 3');
      expect(cache.get(4)).toEqual('data 4');
      expect(cache.get(5)).toEqual('data 5');
    });

    it('updates the cache size', () => {
      var cache = new LRU(5);
      expect(cache.ll.size).toEqual(0);
      cache.set(1, 'data 1');
      expect(cache.ll.size).toEqual(1);
    });
  });

  describe('get', () => {
    describe('when cache is empty', () => {
      var cache = new LRU(5);
      it('returns undefined', () => {
        expect(cache.ll.size).toEqual(0);
        expect(cache.get('1')).toEqual(undefined);
      })

      it('allows to set cache data by passing a function', () => {
        expect(cache.get('99')).toEqual(undefined);
        expect(cache.get('99', () => 'data 99')).toEqual('data 99');
        expect(cache.get('99')).toEqual('data 99');
      })
    });

    describe('when cache has data', () => {
      var cache = new LRU(5);
      cache.set('1', 'data 1');
      cache.set('2', 'data 2');
      cache.set('3', 'data 3');

      it('returns the cached data and moves it to the top', () => {
        expect(cache.ll.first.key).toEqual('3')
        expect(cache.ll.last.key).toEqual('1')
        expect(cache.get('1')).toEqual('data 1');
        expect(cache.ll.first.key).toEqual('1')
        expect(cache.ll.last.key).toEqual('2')
      });
    });
  });
});
