function myMap(arr, callback) {
  return arr.reduce((result, current) => {
    result.push(callback(current));
    return result;
  }, []);
}