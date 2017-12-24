var code = '#include<stdio.h>\nint main(){\n    printf("hello World");\n}'
$( document ).ready(function() {
    var cache= ""
    var editor = ace.edit("code");
    editor.setTheme("ace/theme/merbivore");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.setOptions({
        fontFamily:"monospace",
        fontSize: "10pt"
        });
    editor.container.style.lineHeight = 1.5
    editor.renderer.updateFontSize()
    editor.setValue(code);
    editor.setShowInvisibles(true);
    
    editor.setHighlightActiveLine(false);
    editor.setHighlightGutterLine(false);

    editor.getSession().on('change', function() {
        process(editor.getValue())
    });
        
    //function to handle the request!
    console.log("Network call happens");
    function process(str){
        cache1 = str.replace(/\s/g, "");
        if(cache1 == cache){
            return;
        }
        cache = cache1;
        console.log(str);
        Request.url("http://compiler.dipankar.co.in:7777/run")
        .data({
            "lang":"CPP",
            "code":str,
        })
        .success(function(res){
            $('#output').html(res.output);
            $('#msg').html("Not able to compile, Keep writing your code..")
            if(res.status ==  "success") {
                $('#msg').hide()
                $("#output").show();
            } else {
                $('#msg').show()
                $("#output").hide();
            }
        })
        .error(function(res){
            $('#msg').html("Network issue, not able to comple").show()
            $("#output").hide();
        })
        .post()
    }
});
