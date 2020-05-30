var mCodeMirror; 

/////////////// Uisng Vue ///////////////
var vm = new Vue({
  el: '#app',
  data:  {
    // UI info
    activeModel : null, // join, welcome
    activeNotification:  null, //{"title:"}
    activeDropDown:null, //lang

    // statc
    language: [
      {'lang':'c', name:'C',sample:"#inclde","mode":'text/x-csrc'},
      {'lang':'cpp', name:'C++',sample:"#inclde","mode":'text/x-c++src'},
      {'lang':'py', name:'Python',sample:"print 'hello'","mode":'text/x-python'},
      {'lang':'java', name:'Java',sample:"print 'hello'","mode":"text/x-java"},

    

    ],
    cur_lang:'c',
    cur_code:'',

    // session info
    name:"",
    currentUser:"AA ", // {name, color}
    mPadId:"",
    message: 'Hello Vue!',
    users:[{
      "color":"#ff0000",
      "name":"Dipankar"
    }],

    // boolean vlaue

    

  
    // left pane.
    activeLeftPane:"code",
    code:"",
    draw:[],
    call:null,

    // right pane.
    activePane:"none",
    chat:[], // vm.chat.push({"time":"1:00","name":"dipankar","msg":"How Are you doing?"})
    output:null,
    note: {'summary':'', 'details':'', 'decisision':'', confidence:''}
  },
  methods: {
    setName() {
      this.currentUser = {'color':'#fffff', name:name}
    },
    runProgram(){
      vm.activePane='output'
      vm.output = 'executing....'
      $.ajax("http://simplestore.dipankar.co.in/api/utils/rce", {
        data : JSON.stringify({ lang: this.cur_lang, code: mCodeMirror.getValue() }),
        contentType : 'application/json',
        type : 'POST',
        success:function( data ) {
          vm.output = data.msg
        }
      })
    },
    submitNote(){

    }
  },
  computed: {
  
  },
  watch: {
    cur_lang: function (val) {
      var xx = this.language.filter(x=>x.lang == val)[0]
      mCodeMirror.setValue(xx.sample)
      mCodeMirror.setOption("mode",xx.mode)
    },
  }
})

///////////////////// UI EVENTS /////////////////////////
var EVENTS = {
  // when load page
  onLoad: function(){
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
  },

  onRun: function(){

  },
  onStartCall: function(){
    console.log("event happens");
  },
  onInvite: function(){
    console.log("event happens");
  },
  onInvite: function(){
    console.log("event happens");
  },
  onInvite: function(){
    console.log("event happens");
  },
  onJoin: function(){
    console.log("event happens");
  },
  onStart: function(){
    console.log("event happens");
  },
}

$( function() {
    EVENTS.onLoad() 
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
    vm.mPadId = ref.key
    return ref;
  }