$("#this").keypress(function(e) {
    if (e.which == 13) {
        if ($("#this")[0].value == "") {
            alert("Empty field");
           
        }
        else {
            getData();
        }
    }
});
function convert_values(vale) {
    let value = String(vale);
    if (value.length == 4){
        return parseInt(value.slice(0,1)) +"k"
    }
    if (value.length == 5){
        return  parseInt(value.slice(0,2)) +"k"
    }
    if (value.length == 6){
        return  parseInt(value.slice(0,3)) +"k"
    }
    if (value.length == 7){
        return  parseInt(value.slice(0,1)) +"M"
    }
    if (value.length == 8){
        return  parseInt(value.slice(0,2)) +"M"
    }
    if (value.length == 9){
        return  parseInt(value.slice(0,3)) +"M"
    }
    else {
        return  parseInt(value)
    }
}

function getData() {
    let input_data =  $("#this");
    let response_json =""

   
    $.ajax({
        url: "https://www.instagram.com/"+input_data.val()+"/?__a=1",
        type:'get',
        success: function (response) {
            $("input").css("border", "1px solid lightblue");
            response_json = response;
            console.log(response_json);
            console.log(response_json.graphql.user.edge_follow.count)
            $("#profile_pic")[0].hidden = false;
            $("#posts")[0].innerText = "    \t"+convert_values(response_json.graphql.user.edge_owner_to_timeline_media.count) + "\nposts";
            $("#name")[0].innerText = response_json.graphql.user.full_name;
            $("#username")[0].innerText = response_json.graphql.user.username;
            $("#followers")[0].innerText = +"   \t"+convert_values(response_json.graphql.user.edge_followed_by.count) + "\nFollower";
            $("#following")[0].innerText = "    \t"+convert_values(response_json.graphql.user.edge_follow.count)+ "\nFollowing";
            $("#profile_pic")[0].src = response_json.graphql.user.profile_pic_url;
        },
        error: (xhr, st, er) => {
            $("input").css("border", "1px solid red");
        }
        
    })
    console.log("helow or");
    console.log(response_json);
}