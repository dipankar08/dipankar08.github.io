// This file deps on jquery. Please add it before
// Please see how to use this.
$( document ).ready(function() {
    console.log( "ready!" );
    for(item of $(document).find("[remote_url]")){
        let remote_url = $(item).attr("remote_url");
        let remote_config = $(item).attr("remote_config");
        console.log(`[INFO] Processing ID ${remote_url}, ${remote_config}`)
        $.ajax({
            context:{item:item}, // this will help to set the context currently. 
            url: remote_url,
            type: 'GET',
            beforeSend:function(){
                $(this.item).removeClass('success error').html("Loading...")
            },
            success: function(data){ 
                if(data.status == "success"){
                    $(this.item).addClass('success').html(data.out)
                } else{
                    $(this.item).addClass('error').html(data.msg);
                }
            },
            error: function(data) {
                $(this.item).addClass('error').html("Network Error");
            }
        });
    }
});


