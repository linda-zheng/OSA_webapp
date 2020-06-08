var options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
        text: "OSA trace"
    },
    axisY: {
        includeZero: false,
        lineThickness: 1
    },
    data: [{ type: "line", dataPoints: [] }]
};

var chart = new CanvasJS.Chart("chartContainer", options);

function graph(d) {  
    chart.options.data[0].dataPoints = [];
    for (var i = 0 ; i < d.xdata.length; i++) {
        chart.options.data[0].dataPoints.push({x:d.xdata[i], y:d.ydata[i]});   
    } 
    chart.render();
};

function getTrace(){
    $.ajax({
        type: 'GET',
        url: 'api/trace',
        success: (response)=>{
            graph(response);
        },
        error: (response)=>{
            alert("Error - no trace detected");
        }
    });
};

$("#traceBtn").click(()=>{
    getTrace();
});

var interval;

$("#startBtn").click(()=>{
    $.ajax({
        type: 'GET',
        url: 'api/start',
        success: (response)=>{
            alert(response); //JSON.stringify(response)
            clearInterval(interval);
            interval = setInterval(getTrace, 1000);
        }
    });
});

$("#stopBtn").click(()=>{
    $.ajax({
        type: 'GET',
        url: 'api/stop',
        success: (response)=>{
            clearInterval(interval);
            alert(response);
        }
    });
});

$("#queryBtn").click(()=>{
    var queryType = $("#commands").val();
    if (queryType=="limset") {
        $.ajax({
            type: 'GET',
            url: 'api/cmd/'+queryType+"/"+$("#inMin").val()+"/"+$("#inMax").val(),
            success: (response)=>{
                $('#result').text(JSON.stringify(response));
            }
        });
    } else if (queryType=="echo"){
        $.ajax({
            type: 'GET',
            url: 'api/cmd/'+queryType+"/"+$("#inQuery").val(),
            success: (response)=>{
                $('#result').text(JSON.stringify(response));
            }
        });
    } else if (queryType=="cmd") {
        $.ajax({
            type: 'GET',
            url: 'api/cmd',
            success: (response)=>{
                $('#result').text(JSON.stringify(response));
            }
        });
    }
    else {
        $.ajax({
            type: 'GET',
            url: 'api/cmd/'+queryType,
            success: (response)=>{
                $('#result').text(JSON.stringify(response));
            }
        });
    }
});
$("#commands").change(()=>{
    if ($("#commands").val() == "limset") {
        $("#inMin").show();
        $("#inMax").show();
        $("#inQuery").hide();
    } else if ($("#commands").val() == "echo") {
        $("#inMin").hide();
        $("#inMax").hide();
        $("#inQuery").show();
    } else {
        $("#inMin").hide();
        $("#inMax").hide();
        $("#inQuery").hide();
    }
});