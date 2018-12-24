# lruj
lruj is a simple Least Recently Used cache implementation in javascript, using a doubly linked list.


## API
- `set(key, value)` : set a value in the cache or update an existing one (and mark it as "used", i.e. move it to the top)
- `get(key, [getDataFn])` : get a value from the cache and move it to the top, returns undefined if not found. `getDataFn`  is an optional convenient function that is called when caches misses, the returned value of `getDataFn` will be set in the cache at the `key` provided.

## Usage

```javascript
// Number of items that will be stored in the cache
const maxSize = 100;
var cache = new LRU(maxSize);

cache.set(1, "value 1");
cache.get(1)
=> 'value 1'

cache.get(99)
=> undefined

// Get items from the cache with a convenient function to set the value when cache entry is missing
cache.get(99, () => {
  console.log('fetching data 99');
  // HTTP.get('https://my-api.dev/99')
  return 'data 99';
});
fetching data 99
=> 'data 99'

// The second time the function is called, it will hit the cache and not execute the function passed as a parameter
cache.get(99, () => { 
  console.log('fetching data 99'); 
  // HTTP.get('https://my-api.dev/99') 
  return 'Modified data 99'; 
});
=> 'data 99'
```

## Development
Download the repository:
```
git clone git@github.com:jazzytomato/lruj.git
```
Install dependencies:
```
cd lruj
npm install
```

Run tests with `npm test`
