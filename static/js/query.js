// options and chart contain the data and settings for the chart
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

// graph() updates the data points on the graph
function graph(d) {  
    chart.options.data[0].dataPoints = [];
    for (var i = 0 ; i < d.xdata.length; i++) {
        chart.options.data[0].dataPoints.push({x:d.xdata[i], y:d.ydata[i]});   
    } 
    chart.render();
};

// getTrace() sends a request to retrieve a trace
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

// send a request to notify the OSA to start
// activate the interval to allow repeated acqusition
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

// send a request to notify the OSA to stop
// deactivate the interval
// sometimes there are additional traces that may follow due to some lag
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

// send a query based on the selected command
$("#queryBtn").click(()=>{
    var queryType = $("#commands").val();
    if (queryType=="limset") {
        $.ajax({
            type: 'GET',
            url: 'api/cmd/LIM/'+$("#inMin").val()+"/"+$("#inMax").val(),
            success: (response)=>{
                $('#result').text(JSON.stringify(response));
            }
        });
    } else if (queryType=="echo"){
        $.ajax({
            type: 'GET',
            url: 'api/cmd/'+queryType.toUpperCase()+"/"+$("#inQuery").val(),
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
            url: 'api/cmd/'+queryType.toUpperCase(),
            success: (response)=>{
                $('#result').text(JSON.stringify(response));
            }
        });
    }
});

// display the correct input boxes depending on which query type is selected
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