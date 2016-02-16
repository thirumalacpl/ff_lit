document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //alert('ready');
  var db = window.sqlitePlugin.openDatabase({name: "my.db"});
show();
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS mydata (id integer primary key, name text, email text, eventa text)');
  });

$(document).on('click', '#creat', function(){
    var name =  $("#name").val();
    var email =  $("#email").val();
    var eventa =  $("#eventa").val();
    db.transaction(function(transaction) {
    var executeQuery = "INSERT INTO mydata (name, email, eventa) VALUES (?,?,?)";
    transaction.executeSql(executeQuery, [name,email,eventa]
    , function(tx, result) {
       show();
    },
    function(error){
        //filter(function(aSome) {alert('Error occurred');
    });
    });
});
function show(){
db.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM mydata', [], function (tx, results) {
var key = "";
       var pair="<tr><th data-priority=\"1\"><center>Id</center></th><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"2\"><center>Email</center></th><th data-priority=\"3\"><center>Event</center></th><th><center>Update</center></th><th><center>Delete</center></th></tr>";
       var i=0;
       var len = results.rows.length, i;
       for (i=0; i<=len-1; i++) {
         key = results.rows.item(i).name;
         id = results.rows.item(i).id;
         pair += "<tr><td><center>"+id+"</center></td><td><center>"+key+"</center></td><td><center>"+results.rows.item(i).email+"</center></td><td><a class=\"update\" href=\"#myPopupDialog\"  data-custom="+"'"+ id+ "'" +"data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\"><center><i class='fa fa-pencil-square-o'></i></center></a></td><td><a  id=\"delete\" data=\""+id+"\"><center><i class='fa fa-trash'></i></center></a></td></tr>";
       }
       if (pair == "<tr><th>Name</th><th>Email</th><th>Event</th></tr>") {
         pair += "<tr><td><i>empty</i></td><td><i>empty</i></td><td><i>empty</i></td></tr>";
       }
$("#myTable").html(pair);
}, null);
});
}
$(document).on('click', '#delete', function(){
var id = $(this).attr("data");
db.transaction(function(transaction) {
 transaction.executeSql("DELETE FROM mydata where id=?", [id],
  function(tx, result) {
    show();
  },
  function(error){
  //  alert('Something went Wrong');
  });
 });
});
$(document).on('click', '#upd', function(){
  var id = $("#id").val();
  var name =  $("#uname").val();
  var email =  $("#uemail").val();
   var eventa =  $("#ueventa").val();
   db.transaction(function(transaction) {
 var executeQuery = "";
 transaction.executeSql("UPDATE mydata SET name=?, email=?, eventa=? WHERE id=?", [name,email,eventa,id],
 function(tx, result) {alert('Updated successfully');
show();
},
 function(error){alert('Something went Wrong');});
 });
});
$(document).on('click', '.update', function(){
 var id =  $(this).attr('data-custom');
$("#id").val(id);
db.transaction(function(transaction) {
    transaction.executeSql('SELECT name,email,eventa FROM mydata where id=?', [id], function (tx, results) {
   var name = results.rows.item(0).name;
   var email = results.rows.item(0).email;
    var eventa = results.rows.item(0).eventa;
    $("#uname").val(name);
    $("#uemail").val(email);
     $("#ueventa").val(eventa);
  },
  function(error){
    alert('Something went Wrong');
  });
 });
});
$(document).on('click', '#clearall', function(){
  db.transaction(function(transaction) {
 transaction.executeSql("DELETE FROM mydata", [],
 function(tx, result) {alert('Delete successfully');
show();
},
 function(error){alert('Something went Wrong');});
 });
  });
}
