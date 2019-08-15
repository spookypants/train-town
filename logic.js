// firebase
var firebaseConfig = {
    apiKey: "AIzaSyC0PvlYl1zezezf56r5Alxk5Lfav2-qt3c",
    authDomain: "train-town.firebaseapp.com",
    databaseURL: "https://train-town.firebaseio.com",
    projectId: "train-town",
    storageBucket: "",
    // messagingSenderId: "453213552728",
    // appId: "1:453213552728:web:8d5e02e146066b25"
  };

  firebase.itializeApp(firebaseConfig);

  var trainData = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input")
      .val()
      .trim();
      var destination = $("#destination-input")
      .val()
      .trim();
      var firstTrain = $("#first-train-input")
      .val()
      .trim();
      var frequency = $("#frequency-input")
      .val()
      .trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      };

      alert("Train successfull added!");

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
  });

  trainData.ref().on("child_added", function(childSnapshot, prevChildkey) {
      console.log(childSnapshot.val());

      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().firstTrain;

      var timeArr = tFirstTrain.splt(":");
      var trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), trainTime);
      var tMinutes;
      var tArrival;


      if (maxMoment === trainTime) {
          tArrival = trainTime.format("hh:mm A");
          tMinutes = trainTime.diff(moment(), "minutes");
      } else {
          var differenceTimes = moment().diff(trainTime, "minutes");
          var tRemainder = differenceTimes % tFrequency;
          tMinutes = tFrequency - tRemainder;
          tArrival = mmoment()
            .add(tMinutes, "m")
            .format("hh:mm A");
      }
      console.log("tMinutes: ", tMinutes);
      console.log("tArrival: ", tArrival);

      $("#train-table > tbody").append(
          $("<tr>").append(
              $("<td>").text(tName),
              $("<td>").text(tDestination),
              $("<td>").text(tFrequency),
              $("<td>").text(tArrival),
              $("<td>").text(tMinutes)
          )
      )
  })