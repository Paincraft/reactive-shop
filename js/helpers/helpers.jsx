
function *keyGenerator (initkey, increaseOperation) {
  yield initkey;
  //let iter = initkey;
  let nextKey = increaseOperation(initkey);
  let reset = false;
  while (true) {
    nextKey = increaseOperation(nextKey);
    yield nextKey;
  }
}

export default class Helpers{
  static createDefaultKeyGenerator(initkey, increaseOperation){
    return keyGenerator(0,(key) => {
      return ++key;
    });
  }

  static createKeyGenerator(initkey, increaseOperation){
    return keyGenerator (initkey, increaseOperation);
  }

  //jquery offset poyfill
  static getDomElementOffset(element){
    let docElem, win;
    let box = { top: 0, left: 0 };
    let doc = element && element.ownerDocument;
    docElem = doc.documentElement;

    if ( typeof element.getBoundingClientRect !== typeof undefined ) {
        box = element.getBoundingClientRect();
    }
    win = (doc != null && doc === doc.window) ? doc : doc.nodeType === 9 && doc.defaultView;
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }
}
