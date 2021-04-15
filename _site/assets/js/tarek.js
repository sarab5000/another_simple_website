/*$(function(){
    alert("My First Jquery Test");
 });*/

 console.log("htis is a test");

 $(document).ready(function () {
    $("img").hide();
    $("#reset").click(function (e) {
        $("#citySelect").val("Select")
        $("#message").html("")
    });

    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            $.ajax({
                type: "POST",
                url: "http://api.openweathermap.org/data/2.5/weather?id=" + $("#citySelect").val() + "&appid=f4afeedb92effdb10828f64a21fa0240&units=metric",
                dataType: "json",
                success: function (result, status, xhr) {
                    var table = $("<table><tr><th>Weather Description</th></tr>");

                    table.append("<tr><td>City:</td><td>" + result["name"] + "</td></tr>");
                    table.append("<tr><td>Country:</td><td>" + result["sys"]["country"] + "</td></tr>");
                    table.append("<tr><td>Current Temperature:</td><td>" + result["main"]["temp"] + "°C</td></tr>");
                    table.append("<tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>");
                    table.append("<tr><td>Weather:</td><td>" + result["weather"][0]["description"] + "</td></tr>");

                    $("#message").html(table);
                },
                error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        }
    });

    $(document).ajaxStart(function () {
        $("img").show();
    });

    $(document).ajaxStop(function () {
        $("img").hide();
    });

    function Validate() {
        var errorMessage = "";
        if ($("#citySelect").val() == "Select") {
            errorMessage += "► Select City";
        }
        return errorMessage;
    }
});