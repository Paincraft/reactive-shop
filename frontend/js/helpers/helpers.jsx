
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

  static setDomElementOffset(element, options) {
		let curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition;
    let position = window.getComputedStyle(element).getPropertyValue('position');
		let props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			element.style.position = "relative";
		}

		curOffset = Helpers.getDomElementOffset(element);
		curCSSTop = window.getComputedStyle(element).getPropertyValue('top') || 'auto';
		curCSSLeft = window.getComputedStyle(element).getPropertyValue('left') || 'auto';
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = {top: element.offsetTop, left: element.offsetLeft};
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
      curCSSTop = curCSSTop.replace('px','');
      curCSSLeft = curCSSLeft.replace('px','');
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

    element.style.top = String(props.top) + 'px';
    element.style.left = String(props.left) + 'px'
	}
}
