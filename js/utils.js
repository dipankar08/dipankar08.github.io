//Some utils
var Log =  (function () {
    var d = function(m){ console.log(m)};
    var e = function(m){ console.log(m)};
    var i = function(m){ console.log(m)};
    return {
        d:d,
        e:e,
        i:i,
    }
})();

//assert
function assert(condition, message){
    if (!condition) {
        throw message || "Assertion failed";
    }
}

var Request =  (function () {
    var m_url;
    var m_success;
    var m_error;
    var m_data;
    var m_type;
    var url = function(m){ m_url =m ; return this;};
    var success = function(m){ m_success =m ; return this;};
    var error = function(m){ m_error =m ; return this;};
    var data = function(m){ m_data = m ; return this;};
    var get = function(m){ m_type = 'GET' ; _ajax()};
    var post = function(m){ m_type = 'POST' ; _ajax();};

    var _ajax = function(){
        $.ajax({
            url:m_url,
            type: m_type,
            crossDomain: true,
            data: JSON.stringify(m_data),
            dataType :"json",
           /* contentType: "application/json; charset=utf-8", */
            beforeSend: function() {
                //pass
            },
            success: function(resp, textStatus, jqXHR){
                if(m_success){
                    m_success(resp)
                } 
            },
            error: function (jqXHR, textStatus, errorThrown){
                if(m_error){
                    m_error(textStatus)
                } 
            },
            complete: function(){
                //pass
            }
        });
    }
    return {
        url:url,
        success:success,
        error:error,
        data:data,
        get:get,
        post:post
    }
})();
//Example: 