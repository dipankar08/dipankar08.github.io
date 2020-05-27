var mCodeMirror; 
$( function() {
   var dg = $( ".resizer" ).draggable({
        axis: "x",
        drag: function( event, ui ) {
            console.log(ui)
            $('.codepane').width(ui.position.left - 5)
            $('.rightpane').width(window.innerWidth - ui.position.left - 5)
        }
      });
    // Intiltial size
    $('.codepane').width(window.innerWidth - 400 - 5)
    $('.rightpane').width(400 - 5)
    init();  
});



  function init() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: 'AIzaSyArnBLSwKMYM_dK7u3WI6WRVi1qYknAbKg',
      authDomain: "codersheet-b59fa.firebaseio.com",
      databaseURL: "https://codersheet-b59fa.firebaseio.com/"
    };
    firebase.initializeApp(config);

    //// Get Firebase Database reference.
    var firepadRef = getExampleRef();

    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), { 
        lineNumbers: true,
        mode: 'javascript',
        matchBrackets:true,
        styleActiveLine:true,             
        lineNumbers: true,
        foldGutter:true,
        autoCloseBrackets:true,
        foldCode:true,
    });
    mCodeMirror = codeMirror
    codeMirror.setOption("theme", "monokai");

    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror);

    //// Initialize contents.
    firepad.on('ready', function() {
      if (firepad.isHistoryEmpty()) {
        //firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
      }
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  function getExampleRef() {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    console.log(`ID: ${ref.key}`)
    return ref;
  }