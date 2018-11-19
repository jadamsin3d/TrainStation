var config = {
    apiKey: "AIzaSyCxLvHTl61N-5bsyZsJKhwGgEATMwe6gLY",
    authDomain: "coder-bay-views.firebaseapp.com",
    databaseURL: "https://wednesday-class-test.firebaseio.com",
    storageBucket: "coder-bay-views.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database()

let name = ""
let dest = ""
let arrival = ""
let freq = ""
let time = moment().format('HH:mm');
let next;
let min;
let tillTrain;
let nextrain;

console.log(time);

$(".submitbtn").on("click", function (event) {
    event.preventDefault();

    name = $("#trainName").val().trim();

    dest = $("#trainDes").val().trim();

    arrival = $("#firstTime").val().trim();

    freq = $("#trainFreq").val().trim();

    moment(arrival).format('HH.mm');

    let converted = moment(arrival, 'HH:mm').subtract(1, "years");

    let diff = moment().diff(moment(converted, 'minutes'));

    let remain = diff % freq;

    tillTrain = freq - remain;

    nextrain = moment().add(tillTrain, "minutes").format("HH.mm a");

    $('#trainName').val('');
    $('#trainDes').val('');
    $('#firstTime').val('');
    $('#trainFreq').val('')

    database.ref().push({
        name: name,
        dest: dest,
        arrival: arrival,
        freq: freq,
        tillTrain: tillTrain,
        nextrain: nextrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (childSnapshot) {

    $(".table").prepend("<tr><td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().dest + "</td>" + "<td>" +
        childSnapshot.val().arrival + "</td>" + "<td>" + childSnapshot.val().freq + "</td>" + "<td>" +
        childSnapshot.val().nextrain + "</td>" + "<td>" + childSnapshot.val().tillTrain + "</td></tr>")
},

    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
;
