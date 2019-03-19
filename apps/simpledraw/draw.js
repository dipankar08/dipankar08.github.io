var drawBoard = (function() {
  // define const here
  var GAP_X = 10;
  var GAP_Y = 16;
  var TEXT_GAP_OFFSET =2;
  var BACKGROUND_COLOR = "#fff";
  var STOKE_COLOR = "#F2EFEB"; //"#FEFAF9"//"#f5f5f5"
  var TEXT_COLOR = "#000";
  var canvas = document.getElementById("canvas");
  let canvasBuilder = buildCanvus(canvas);
  let { context, dpi, set, get } = canvasBuilder;
  dpi_adjust();
  //context = canvas.getContext("2d");
  // Build the canvus.
  function buildCanvus(ele) {
    let returnable = {
      canvas: ele,
      context: ele.getContext("2d"),
      dpi: window.devicePixelRatio
    };
    returnable.get = {
      style: {
        height() {
          return +getComputedStyle(ele).getPropertyValue("height").slice(0, -2);
        },
        width() {
          return +getComputedStyle(ele).getPropertyValue("width").slice(0, -2);
        }
      },
      attr: {
        height() {
          return returnable.ele.getAttribute("height");
        },
        width() {
          return returnable.ele.getAttribute("height");
        }
      }
    };
    returnable.set = {
      style: {
        height(ht) {
          ele.style.height = ht + "px";
        },
        width(wth) {
          ele.style.width = wth + "px";
        }
      },
      attr: {
        height(ht) {
          ele.setAttribute("height", ht);
        },
        width(wth) {
          ele.setAttribute("width", wth);
        }
      }
    };
    return returnable;
  }
  function dpi_adjust() {
    dpi =  window.devicePixelRatio;
  set.attr.height(get.style.height() * dpi);
  set.attr.width(get.style.width() * dpi);
}

  // resize the canvas to fill browser window dynamically
  window.addEventListener("resize", resizeCanvas, false);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBoard();
  }
  resizeCanvas();

  // touch events.
  var drawing = false;
  var mCallback = undefined;
  var lastPos = undefined;
  canvas.addEventListener(
    "mousedown",
    function(e) {
      drawing = true;
      mousePos = getMousePos(canvas, e);
      if (mCallback) {
        mCallback.onStart(mousePos);
      }
    },
    false
  );

  canvas.addEventListener(
    "mouseup",
    function(e) {
      drawing = false;
      notify(getMousePos(canvas, e));
      if (mCallback) {
        mCallback.onEnd();
      }
    },
    false
  );

  canvas.addEventListener(
    "mousemove",
    function(e) {
      notify(getMousePos(canvas, e));
    },
    false
  );

  function notify(mousePos) {
    if (!drawing) {
      return;
    }
    if (lastPos && lastPos[0] == mousePos[0] && lastPos[1] == mousePos[1]) {
      return;
    }
    lastPos = mousePos;
    console.log(mousePos);
    if (mCallback) {
      mCallback.onMove(mousePos);
    }
  }

  //private function
  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    (x = mouseEvent.clientX - rect.left), (y = mouseEvent.clientY - rect.top);
    return [parseInt(x / GAP_X), parseInt(y / GAP_Y)];
  }
  function drawBoard() {
    context.beginPath();
    for (var x = 0; x <= canvas.width; x += GAP_X) {
      context.moveTo(0.5 + x, 0);
      context.lineTo(0.5 + x , canvas.height);
    }

    for (var x = 0; x <= canvas.height; x += GAP_Y) {
      context.moveTo(0, 0.5 + x);
      context.lineTo(canvas.width, 0.5 + x);
    }
    context.strokeStyle = STOKE_COLOR;
    context.stroke();
  }

  function getCoordinate(x, y) {
    return { x: x * GAP_X, y: x * GAP_Y };
  }
  var text = function(x, y, text, color) {
    for (var i = 0; i < text.length; i++) {
        printChar(x+i, y,text[i]);
      }
  };

  var strok_x = function(x, y, color) {
    context.beginPath();
    context.moveTo(0.5 + x * GAP_X + 1, y * GAP_Y + GAP_Y / 2);
    context.lineTo((x + 1) * GAP_X - 1.5, y * GAP_Y + GAP_Y / 2);
    context.strokeStyle = TEXT_COLOR;
    context.stroke();
  };

  function plus(x, y) {
    midx = x * GAP_X + GAP_X / 2;
    midy = y * GAP_Y + GAP_Y / 2;
    context.moveTo(midx - 3 + 0.5, midy + 0.5);
    context.lineTo(midx + 3 + 0.5, midy + 0.5);
    context.moveTo(midx + 0.5, midy - 3);
    context.lineTo(midx + 0.5, midy + 3);
    mark(x, y);
  }
  function minus(x, y) {
    context.moveTo(x * GAP_X + 2.5, y * GAP_Y + GAP_Y / 2 + 0.5);
    context.lineTo((x + 1) * GAP_X - 1.5, y * GAP_Y + GAP_Y / 2 + 0.5);
    mark(x, y);
  }

  function minus_h(x, y) {
    context.moveTo(x * GAP_X + GAP_X / 2 + 0.5, y * GAP_Y + 2);
    context.lineTo(x * GAP_X + GAP_X / 2 + 0.5, (y + 1) * GAP_Y - 2);
    mark(x, y);
  }
  function line_x(x, y, count) {
    for (var i = 1; i < count; i++) {
      minus(x + i, y);
    }
  }
  function line_y(x, y, count) {
    for (var i = 1; i < count; i++) {
      minus_h(x, y + i);
    }
  }

  function getDirection(x1, y1, x2, y2) {
    if (x1 <= x2) {
      if (y1 <= y2) {
        return 1; //Down Right
      } else {
        return 2; // UP Right.
      }
    } else {
      if (y1 <= y2) {
        return 3; // Down Left
      } else {
        return 4; // UP Left
      }
    }
  }

  // returns the topleft and botton right for any two point acts as rest
  function getFixedCorner(x1, y1, x2, y2) {
    if (x1 <= x2) {
      if (y1 <= y2) {
        return [x1, y1, x2, y2];
      } else {
        return [x1, y2, x2, y1];
      }
    } else {
      if (y1 <= y2) {
        return [x2, y1, x1, y2];
      } else {
        return [x2, y2, x1, y1];
      }
    }
  }
  function printChar(x, y, c) {
    context.font = "14px monospace";
    context.fillText(c, x*GAP_X, y*GAP_Y+GAP_Y-TEXT_GAP_OFFSET);
  }

  // Let's define the api below this line:
  // Build a line if you provide two touch point.
  var line = function(x1, y1, x2, y2) {
    context.beginPath();
    console.log(getDirection(x1, y1, x2, y2));
    switch (getDirection(x1, y1, x2, y2)) {
      case 1:
        line_y(x1, y1, y2 - y1);
        line_x(x1, y2, x2 - x1);
        plus(x1, y2);
        break;
      case 2:
        line_y(x1, y2, y1 - y2);
        line_x(x1, y2, x2 - x1);
        plus(x1, y2);
        break;
      case 3:
        line_y(x1, y1, y2 - y1);
        line_x(x2, y2, x1 - x2);
        plus(x1, y2);
        break;
      case 4:
        line_y(x1, y2, y1 - y2);
        line_x(x2, y2, x1 - x2);
        plus(x1, y2);
        break;
    }
    plus(x1, y1);
    plus(x2, y2);
    context.strokeStyle = TEXT_COLOR;
    context.stroke();
  };

  // draw a rect randomly if you provide two touch point.
  var rect = function(x11, y11, x22, y22) {
    cor = getFixedCorner(x11, y11, x22, y22);
    (x1 = cor[0]), (y1 = cor[1]), (x2 = cor[2]), (y2 = cor[3]);
    context.beginPath();
    //mark 4 line
    line_x(x1, y1, x2 - x1);
    line_x(x1, y2, x2 - x1);
    line_y(x1, y1, y2 - y1);
    line_y(x2, y1, y2 - y1);
    // mark 4 cornor
    plus(x1, y1);
    plus(x2, y2);
    plus(x1, y2);
    plus(x2, y1);
    context.strokeStyle = TEXT_COLOR;
    context.stroke();
  };

  // mark API
  var mark = function(x, y, color) {
    if (!color) {
      color = STOKE_COLOR;
    }
    context.fillStyle = color;
    context.fillRect(x * GAP_X + 1, y * GAP_Y + 1, GAP_X - 1, GAP_Y - 1);
  };
  var markRect = function(x1, y1, x2, y2) {
    for (var i = x1; i <= x2; i++) {
      for (var j = y1; j <= y2; j++) {
        mark(i, j);
      }
    }
  };

  //clear API.
  var clear = function(x, y) {
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(x * GAP_X + 1, y * GAP_Y + 1, GAP_X - 1, GAP_Y - 1);
  };
  var clearRect = function(x1, y1, x2, y2) {
    for (var i = x1; i <= x2; i++) {
      for (var j = y1; j <= y2; j++) {
        clear(i, j);
      }
    }
  };
  var clearAll = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  var attchTouchCallback = function(callback) {
    mCallback = callback;
  };
  
  
  return {
    mark: mark,
    markRect: markRect,
    clear: clear,
    clearRect: clearRect,
    clearAll: clearAll,
    text: text,
    line: line,
    rect: rect,
    attchTouchCallback: attchTouchCallback,
  };
})();

// test

var start;
drawBoard.attchTouchCallback(
    {'onStart':function(a){
        start=a;
    },'onMove':function(a){
        drawBoard.clearAll();
        drawBoard.rect(start[0],start[1],a[0],a[1]);
        //drawBoard.line(start[0],start[1],a[0],a[1]);
        console.log(a);
    },'onEnd':function(a){console.log(a);}})
    
