
/////////////// Uisng Vue ///////////////
var app = new Vue({
  el: '#app',
  data: {
    // UI info
    leftPane:'code',// code or draw
    activeModel: 'loading', //loading,setting,join,welcome
    activeNotification: null, //{"title:"}
    activeDropDown: null, //lang
    notification: null, // app.notification = {type:'error', msg:'wrong'}


    //IDs
    codersheet_id: null,
    codersheet_shortcode:"",
    invite_email:"",

    code_db_ref: null,

    // rtc
    rtc_float:true,
    rtc_ref: null,
    rtc_supported:true,
    rtc_audio_mute:false,
    rtc_video_mute:false,
    rtc_screen_share:false,

    // chat
    chat_sound: null,
    chat_db_ref: null,
    chat_box_input: "",
    chat_live_count: 0,
    chat_history: [
      { is_me: true, msg: "How Are you doing?" },
      { is_me: false, msg: "How Are you doing?" },
    ], // app.chat.push()

    // common string:
    error_msg: "",

    // editor:
    codeMirror: null,
    code_language: [
      {
        'lang': 'c', name: 'C', sample: `#include <stdio.h>
      int main(){
        printf("Hello, World!");
        return 0;
      }`, "mode": 'text/x-csrc'
      },
      {
        'lang': 'cpp', name: 'C++', sample: `#include <iostream>
      using namespace std;
      int main(){
        cout << "Hello World" << endl; 
        return 0;
      }`, "mode": 'text/x-c++src'
      },
      { 'lang': 'python', name: 'Python', sample: "print 'hello'", "mode": 'text/x-python' },
      {
        'lang': 'java', name: 'Java', sample: `public class HelloWorld{

        public static void main(String []args){
           System.out.println("Hello World");
        }
   }`, "mode": "text/x-java"
      },
    ],
    code_language_selected: 'c',
    cur_code: '',

    // session info
    username: "",
    currentUser: "AA ", // {name, color}
    mPadId: "",
    message: 'Hello Vue!',
    users: [{
      "color": "#ff0000",
      "name": "Dipankar"
    }],
    // boolean vlaue

    // left pane.
    code: "",
    draw: [],
    call: null,

    // right pane.
    activePane: "none",

    output: null,
    note: { 'summary': '', 'details': '', 'decisision': '', confidence: '' }
  },
  methods: {
    chat_box_submit(keyEvent) {
      if (keyEvent.key == 'Enter') {
        if (!verifyOrError(app.username.trim().length > 0, "Please set the username")) {
          return;
        }
        app.chat_db_ref.push().set({
          name: app.username,
          msg: app.chat_box_input
        })
        app.chat_box_input = ""
      }
    },

    loadPage() {
      app.codersheet_id = new URL(window.document.location.href).searchParams.get('id');
      if (!app.codersheet_id) {
        app.activeModel = 'error'
        app.error_msg = "Looks like you are not having the right URL"
        return;
      }
      $.ajax("https://simplestore.dipankar.co.in:8443/api/codersheet_pads1", {
        data: JSON.stringify({ id: app.codersheet_id }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          if (data.status == 'error') {
            app.activeModel = 'error'
            app.error_msg = "Sorry! This is a invalid link!"
          } else {
            app.output = data.msg
            app.activeModel = 'null'
            app.processBoot()
          }
        },
        error: function (data) {
          app.activeModel = 'error'
          app.error_msg = "Sorry! This is a invalid link!"
        }
      })
    },

    processBoot() {
      initUI();
      initFirebase();
      initRTC()
      initDraw();
    },

    runProgram() {
      console.log("Trying to run...")
      app.activePane = 'output'
      app.output = 'executing....'
      $.ajax("https://simplestore.dipankar.co.in:8443/api/utils/rce", {
        data: JSON.stringify({ lang: this.code_language_selected, code: app.codeMirror.getValue() }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          app.output = data.msg
        }
      })
    },
    getLink(){
      return `https://codersheet.io/${app.codersheet_id}`
    },
    invite_send(){
      $.ajax("https://simplestore.dipankar.co.in:8443/api/utils/email", {  
        data: JSON.stringify({ 
          to: app.invite_email,
          'subject':'You are invited to the coder sheet',
          'body':`Please click the link ${app.getLink()} to join the codersheet now!`
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processSimpleStoreResp(data);
        },
        error:function(){

        }
      })
    },
    submitNote() {

    },
    rtcToggleAudio(){
      app.rtc_ref.executeCommand('toggleAudio',[])
    },
    rtcToggleVideo(){
      app.rtc_ref.executeCommand('toggleVideo',[])
    },
    rtcToggleScreen(){
      app.rtc_ref.executeCommand('toggleShareScreen',[])
    },
  },
  computed: {

  },
  watch: {
    code_language_selected: function (val) {
      var xx = this.code_language.filter(x => x.lang == val)[0]
      app.codeMirror.setValue(xx.sample)
      app.codeMirror.setOption("mode", xx.mode)
    },
    'username': function (val) {
      $.cookie('username', val)
      this.currentUser = { 'color': '#fffff', name: app.username }
    },
    'chat_sound': function (val) {
      if (val == null) {
        return;
      }
      url = "audio/msg.mp3"
      switch (val) {
        case 'connect':
          url = "audio/msg.mp3"
          break
        case 'disconnect':
          url = "audio/msg.mp3"
          break
        case 'self_msg':
          url = "audio/msg.mp3"
          break
        case 'peer_msg':
          url = "audio/msg.mp3"
          break
      }
      if (url.length > 0) {
        var audio = new Audio(url);
        audio.play();
      }
    },
  },
  created() {
    console.log("created")
    window.onbeforeunload = function () {
      app.rtc_ref.executeCommand('hangup')
      return "handle your events or msgs here";
    }
    // put all login in initUI
  }

})

function initUI() {
  app.username = $.cookie('username')
  if (!app.username || app.username.length == 0) {
    app.activeModel = 'join'
  }

  var dg = $(".resizer").draggable({
    axis: "x",
    drag: function (event, ui) {
      console.log(ui)
      $('.leftpane').width(ui.position.left - 5)
      $('.rightpane').width(window.innerWidth - ui.position.left - 5)
    }
  });
}

function initDraw(){
  draw_id = '5ed2e332d88a8b46ab3b7,0e5ed2e332d88a8b46ab3'
  url = `https://excalidraw.com/#room=${draw_id}`
  $('#draw').attr('src', url)
}

function initRTC() {
  const domain = 'meet.jit.si';
  const options = {
    roomName: app.codersheet_id,
    width: 500,
    height: 500,
    configOverwrite: {
      startAudioOnly:false,
    },
    parentNode: document.querySelector('#meet')
  };
  app.rtc_ref = new JitsiMeetExternalAPI(domain, options);
  $('.call_floating_modal').show();
  $('.call_floating_modal').draggable();   
  //app.rtc_ref.addEventListener()
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
    matchBrackets: true,
    styleActiveLine: true,
    lineNumbers: true,
    foldGutter: true,
    autoCloseBrackets: true,
    foldCode: true,
  });
  app.codeMirror.setOption("theme", "monokai");

  //// Create Firepad (with rich text toolbar and shortcuts enabled).
  var firepad = Firepad.fromCodeMirror(app.code_db_ref, app.codeMirror);

  //// Initialize contents.
  firepad.on('ready', function () {
    if (firepad.isHistoryEmpty()) {
      //firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
    }
  });
}

// Helper to get hash from end of URL or generate a random one.
function createDbRef() {
  if (!verifyOrError(app.codersheet_id != null, "Something Went Wrong")) return;
  var ref = firebase.database().ref();
  app.code_db_ref = ref.child(app.codersheet_id).child('code')

  app.chat_db_ref = ref.child(app.codersheet_id).child('chat')
  app.chat_db_ref.on("child_added", function (snapshot) {
    console.log(snapshot.key);
    snapshot.val().is_me = snapshot.val().name == app.username
    app.chat_history.push(snapshot.val())
    $(".chat ul").scrollTop(100000)
    if (!snapshot.val().is_me) {
      app.chat_sound = "msg2"
      app.chat_sound = null
    }
  });
}

function verifyOrError(cond, msg) {
  console.log(msg)
  return cond;
}
function processSimpleStoreResp(data){
  if(data.status == 'success'){
    app.notification = {type:'success', msg:data.msg}
  } else {
    app.notification = {type:'error', msg:data.msg}
  }
}
app.loadPage()


// Todo:
// 1. get and generate short code whne loading invite ( optimized generate if not their)
// 2. mail send issue in AWS
// 3. fetch info by id or shosrt code. 