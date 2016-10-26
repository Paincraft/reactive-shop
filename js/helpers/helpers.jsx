
function *keyGenerator (initkey, increaseOperation) {
  yield initkey;
  //let iter = initkey;
  let nextKey = increaseOperation(initkey);
  let reset = false;
  while (true) {
    nextKey = increaseOperation(nextKey);
    reset = yield nextKey;
    if(reset === true){
      yield nextKey;
      nextKey = initkey;
      yield initkey;
    }
  }
}

export default class Helpers{
  static createKeyGenerator(initkey, increaseOperation){
    return keyGenerator (initkey, increaseOperation);
  }
}
