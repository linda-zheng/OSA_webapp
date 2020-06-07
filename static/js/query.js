var count = 1
function getTrace(){
    $.ajax({
        type: 'GET',
        url: 'api/trace',
        success: (response)=>{
            $("#traceImg").attr('src', "/static/img/test1.png?time="+ count);
            count++
        },
        error: (response)=>{
            alert("error");
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
            alert(response);
            clearInterval(interval);
        }
    });
});