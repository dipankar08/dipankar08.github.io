// This file deps on jquery. Please add it before
// Please see how to use this.
$( document ).ready(function() {
    console.log( "ready!" );
    for(item of $(document).find("[remote_url]")){
        loadItem(item);
    }
});

function loadItem(item){
    let remote_url = $(item).attr("remote_url");
    let remote_config = $(item).attr("remote_config");
    if(remote_config){
        remote_config = remote_config.split(" ")
    }
    let data_presentation = $(item).attr("data_presentation");
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
                if(data_presentation == 'ts'){
                    renderChart($(this.item).attr('id'), data.out);
                }
                else if(data_presentation == 'list_table'){
                    $(this.item).addClass('success').html(createTableFromList(data.out))
                } else{
                    $(this.item).addClass('success').html(JSON.stringify(data.out))
                }
            } else{
                $(this.item).addClass('error').html(JSON.stringify(data.msg));
            }
        },
        error: function(data) {
            $(this.item).addClass('error').html("Network Error");
        }
    });
}

function createTableFromList(arr){
    head= [] ; arr.forEach(x => (Object.keys(x).forEach(y=>head.push(y))))
    head = Array.from(new Set(head));
    return `<table>
        <tr>
        ${head.map(x=> `<td>${x}</td>`).join()}
        </tr>
        ${
            arr.map(x=>{
                return `<tr> ${head.map(y=> `<td>${x[y]}</td>`).join()} </tr>`
            }).join()
        }
    </table>`
}

function clearCanvas(id){
    var canvas1 = document.getElementById(id);
    const context1 = canvas1.getContext('2d');
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
}
var chartStore={}
function renderChart(id, arr){
    clearCanvas(id);
    if(chartStore[id]){
        chartStore[id].destroy();
    }
    chartStore[id] =  new Chart(document.getElementById(id), {
        type: 'line',
        data: {
          labels: arr.map(x=>x.day),
          datasets: [{ 
              data: arr.map(x=>x.count),
              label: "Count",
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: ''
          }
        }
      });
}

