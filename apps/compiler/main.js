var FIRST_CODE = '#include<stdio.h>\nint main(){\n    printf("hello World");\n}'
var NETWORK_CALL_TIME_OUT = 1000 // please make it zero if you dont need timeout

var cnt_network_save = 0;
var cnt_network_call = 0;
var startTime = (new Date()).getTime()


$( document ).ready(function() {
    var cache= ""
    // 1. editor Operation.
    var editor = ace.edit("code");
    editor.setTheme("ace/theme/merbivore");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.setOptions({
        fontFamily:"monospace",
        fontSize: "10pt"
        });
    editor.container.style.lineHeight = 1.5
    editor.renderer.updateFontSize()
    editor.setValue(FIRST_CODE);
    editor.session.selection.clearSelection()
    editor.setShowInvisibles(true);
    
    editor.setHighlightActiveLine(false);
    editor.setHighlightGutterLine(false);

    editor.getSession().on('change', function() {
        processByTimeout()
    });


    // 1A. Showing error in editors
    function clearerror(){
        editor.session.clearBreakpoints();
        $(".ace_gutter-cell").attr("title","");
    }
    function showerror(error){
        if(error == undefined) return;
        for (var prop in error) {
            if(!error.hasOwnProperty(prop)) continue;
            editor.session.setBreakpoint(prop-1,"red")
            $($(".ace_gutter-cell")[prop-1]).attr("title", error[prop])
        }
    }
    

    // 2. Timer used to save network calls.
    var timeoutHandle;
    function processByTimeout(){
        if (NETWORK_CALL_TIME_OUT == 0 ){
            process();
            return;
        }
        if(timeoutHandle != undefined){
            window.clearTimeout(timeoutHandle);
        }
        timeoutHandle = window.setTimeout(function(){
            process();
        }, NETWORK_CALL_TIME_OUT);
        cnt_network_save++;
        console.log("Save network call by timer reset");
    }


    // 3. function to compile data and display results.
    function process(){
        var str = editor.getValue();
        cache1 = str.replace(/\s/g, "");
        if(cache1 == cache){
            console.log("No code chnages - skiped!");
            return;
        }
        console.log("Network call happens");
        cache = cache1;
        console.log(str);
        Request.url("http://compiler.dipankar.co.in:7777/run")
        //Request.url("http://0.0.0.0:7777/run")
        .data({
            "lang":"CPP",
            "code":str,
        })
        .success(function(res){
            $('#output').html(res.output);
            $('#msg .head').html("Code is not ready to compile...")
            $('#msg .details').html(res.stderr)
            clearerror();
            if(res.status ==  "success") {
                $('#msg').hide()
                $("#output").show();
            } else {
                $('#msg').show()
                $("#output").hide();
                showerror(res.formatted_error)
            }
        })
        .error(function(res){
            $('#msg .head').html("Network issue, not able to comple").show()
            $("#output").hide();
        })
        .post()
        cnt_network_call++;
    }

    
    // 4. Having some telemetry logs.
    Request.url("http://simplestore.dipankar.co.in/api/stat_compiler")
    .data( {"_cmd":"insert", "ops_type" : "OnLoad"} )
    .post()

    // 5. Save the data to the sever 
    // TODO
});

//5. Save my frineds from data loss for acidental close
window.onbeforeunload = function() {
     return "Did you save your stuff? Press CTRL+ S to save"
}

// 6. Last telemtry..
navigator.sendBeacon = navigator.sendBeacon || function (url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.send(data);
};
window.addEventListener("unload", logData, false);
function logData() {
    analyticsData = {"_cmd":"insert","NetworkcallHappens": cnt_network_call, "NetworkcallSaving":cnt_network_save ,"ops_type" : "OnUnload","TimeSpent": ((new Date()).getTime() - startTime)/1000+"sec"}
    navigator.sendBeacon("http://simplestore.dipankar.co.in/api/stat_compiler", '{"a":9}');
}
