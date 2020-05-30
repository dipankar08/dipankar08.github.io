
/////////////// Uisng Vue ///////////////
var app = new Vue({
  el: '#app',
  data:  {
    // UI info
    activeModel : 'loading', //loading,setting,join,welcome
    activeNotification:  null, //{"title:"}
    activeDropDown:null, //lang

    //IDs
    codersheet_id:null,
    chat_db_ref:null,
    code_db_ref:null,

    // common string:
    error_msg:"",
    

    // editor:
    codeMirror:null,
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
    chat:[], // app.chat.push({"time":"1:00","name":"dipankar","msg":"How Are you doing?"})
    output:null,
    note: {'summary':'', 'details':'', 'decisision':'', confidence:''}
  },
  methods: {
    setName() {
      this.currentUser = {'color':'#fffff', name:name}
    },

    loadPage(){
      var hash = window.location.hash.replace(/#/g, '');
      if(!hash){
        app.activeModel = 'error'
        app.error_msg = "Looks like you are not having the right URL"
        return;
      }
      app.codersheet_id = hash
      $.ajax("http://simplestore.dipankar.co.in/api/codersheet", {
        data : JSON.stringify({ id: hash}),
        contentType : 'application/json',
        type : 'POST',
        success:function( data ) {
          if(data.status == 'error'){
            app.activeModel = 'error'
            app.error_msg = "Sorry! This is a invalid link!"
          } else {
            app.output = data.msg
            app.activeModel = 'null'
            app.processBoot()
          }
        },
        error:function(data){
          app.activeModel = 'error'
          app.error_msg = "Sorry! This is a invalid link!"
        }
      })
    },

    processBoot(){
        initUI();
        initFirebase()
    },

    runProgram(){
      app.activePane='output'
      app.output = 'executing....'
      $.ajax("http://simplestore.dipankar.co.in/api/utils/rce", {
        data : JSON.stringify({ lang: this.cur_lang, code: app.codeMirror.getValue() }),
        contentType : 'application/json',
        type : 'POST',
        success:function( data ) {
          app.output = data.msg
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
      app.codeMirror.setValue(xx.sample)
      app.codeMirror.setOption("mode",xx.mode)
    },
  }
})

function initUI(){
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
}

function initFirebase() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: 'AIzaSyArnBLSwKMYM_dK7u3WI6WRVi1qYknAbKg',
      authDomain: "codersheet-b59fa.firebaseio.com",
      databaseURL: "https://codersheet-b59fa.firebaseio.com/"
    };
    firebase.initializeApp(config);

    //// Get Firebase Database reference.
    createDbRef();

    //// Create CodeMirror (with lineWrapping on).
    app.codeMirror = CodeMirror(document.getElementById('firepad'), { 
        lineNumbers: true,
        mode: 'javascript',
        matchBrackets:true,
        styleActiveLine:true,             
        lineNumbers: true,
        foldGutter:true,
        autoCloseBrackets:true,
        foldCode:true,
    });
    app.codeMirror.setOption("theme", "monokai");

    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(app.code_db_ref, app.codeMirror);

    //// Initialize contents.
    firepad.on('ready', function() {
      if (firepad.isHistoryEmpty()) {
        //firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
      }
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  function createDbRef() {
    if(!verifyOrError(app.codersheet_id != null, "Something Went Wrong"))return;
    var ref = firebase.database().ref();
    app.chat_db_ref= ref.child(app.codersheet_id).child('chat')
    app.code_db_ref= ref.child(app.codersheet_id).child('code')
  }

  function verifyOrError(cond, msg){
    return cond;
  }
  app.loadPage()