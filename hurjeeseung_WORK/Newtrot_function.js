$(function() {
    $("#YEAR").slider({
        range: "max",
        min: 1930,
        max: 2020,
        value: 1,
        slide: function(event, ui) {
            $("#YEAR-val").val(ui.value);
            let temp=$("#TEMP-val").val();
            $("#input-letter").css('font-variation-settings',"'YEAR' "+ui.value +",'TEMP' "+temp);

        }
    });
    $("#YEAR-val").val($("#YEAR").slider("value"));


    $("#TEMP").slider({
        range: "max",
        min: 0,
        max: 1000,
        values: 1,
        slide: function(event, ui) {
            $("#TEMP-val").val(ui.value);
            let year= $("#YEAR-val").val();
           $("#input-letter").css('font-variation-settings',"'TEMP' "+ui.value+",'YEAR' "+year);

        }
    });
    $("#TEMP-val").val($("#TEMP").slider("value"));


    $("#input-letter").on("propertychange change keyup paste input",function(){
        $(".output-letter").html($(this).val());
       var content = $(this).val();

       $(this)[0].style.height='auto';
       $(this).height( $(this).prop('scrollHeight'));

       var output=$(".output-letter");
       for(var i=0;i<output.length;i++)output[i].style.height='auto';
       $(".output-letter").height( $(".output-letter").prop('scrollHeight'));


       // 여기가 글씨 개수대로 글자크기 바꾸는 곳이야, 글자수는 숫자들 바꾸면 되고 글자크기는 맘대로바꿔!
        if(content.length <= 6 && content.length>=0){
        $("#input-letter").css("fontSize",'10rem');
        }else if (content.length > 6 && content.length <=15 ){
        $("#input-letter").css("fontSize",'8rem');
        }
        else if(content.length>15&&content.length<=28){
        $("#input-letter").css('font-size','6rem');
        }
        else if(content.length>28){
        $("#input-letter").css('font-size','4rem');
        }
    });
   



});

var ckwindow =window.matchMedia("screen and (min-width:500px) ");
if(ckwindow.matches){

$(document).mousemove(function(event){
    
    xPercent = event.pageX / $( '.first-part' ).width() * 100;
    yPercent = event.pageY / $( '.first-part' ).height() * 100;
    xPercentFixed = xPercent.toFixed();
    yPercentFixed = yPercent.toFixed();

    xWidth = 0 + xPercentFixed*10;
    yWeight = 1930 + yPercentFixed*90/100;
    $("#input-letter").css('font-variation-settings',"'TEMP' "+xWidth+",'YEAR' "+yWeight);
});
}