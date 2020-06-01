
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
   
    code_db_ref:null,

    // chat
    chat_db_ref:null,
    chat_box_input:"",
    chat_live_count: 0,

    // common string:
    error_msg:"",

    // editor:
    codeMirror:null,
    code_language: [
      {'lang':'c', name:'C',sample:`#include <stdio.h>
      int main(){
        printf("Hello, World!");
        return 0;
      }`,"mode":'text/x-csrc'},
      {'lang':'cpp', name:'C++',sample:`#include <iostream>
      using namespace std;
      int main(){
        cout << "Hello World" << endl; 
        return 0;
      }`,"mode":'text/x-c++src'},
      {'lang':'python', name:'Python',sample:"print 'hello'","mode":'text/x-python'},
      {'lang':'java', name:'Java',sample:`public class HelloWorld{

        public static void main(String []args){
           System.out.println("Hello World");
        }
   }`,"mode":"text/x-java"},
    ],
    code_language_selected:'c',
    cur_code:'',

    // session info
    username:"",
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
    chat:[
      {is_me:true, msg:"How Are you doing?"},
      {is_me:false,msg:"How Are you doing?"},
    ], // app.chat.push()
    output:null,
    note: {'summary':'', 'details':'', 'decisision':'', confidence:''}
  },
  methods: {
    chat_box_submit(keyEvent) {
      if(keyEvent.key == 'Enter'){
        app.chat_db_ref.push().setValue({is_me:true, msg:app.chat_box_input})
      }
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
      console.log("Trying to run...")
      app.activePane='output'
      app.output = 'executing....'
      $.ajax("http://simplestore.dipankar.co.in/api/utils/rce", {
        data : JSON.stringify({ lang: this.code_language_selected, code: app.codeMirror.getValue() }),
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
    code_language_selected: function (val) {
      var xx = this.code_language.filter(x=>x.lang == val)[0]
      app.codeMirror.setValue(xx.sample)
      app.codeMirror.setOption("mode",xx.mode)
    },
    'username':function(val){
      $.cookie('username',val)
      this.currentUser = {'color':'#fffff', name:username}
    }
  },
  created(){
    console.log("created")
    // put all login in initUI
  }
})

function initUI(){
  this.username = $.cookie('username')
  if(!this.username){
    app.activeModel = 'join'
  }
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
    app.code_db_ref= ref.child(app.codersheet_id).child('code')

    app.chat_db_ref= ref.child(app.codersheet_id).child('chat')
    app.chat_db_ref.on("child_added", function(snapshot) {
      console.log(snapshot.key);
    });
  }

  function verifyOrError(cond, msg){
    return cond;
  }
  app.loadPage()