/*function startApp() {
    alert('ready');
   // show();
    var db = window.sqlitePlugin.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    alert(db);
    db.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS phonegap_pro (id integer primary key, name text, email text)', [],
        function(tx, result) {
            alert("Table created successfully");
        },
        function(error) {
            alert("Error occurred while creating the table.");
        });


    });

$(document).on('click', '#creat', function(){
   //var title="sundaravel";
    //var desc="phonegap freelancer";
    alert('hello');
    var name =  $("#name").val();
    alert(name);
    var email =  $("#email").val();
    db.transaction(function(transaction) {
        alert('inserted trans');
    var executeQuery = "INSERT INTO phonegap_pro (name, email) VALUES (?,?)";
    transaction.executeSql(executeQuery, [name,email]
    , function(tx, result) {
        alert('Name Inserted :' + name + ", Email :" + email);
        //show();
    },
    function(error){
        alert('Error occurred');
    });
    });



});


function show(){
alert('show');
db.transaction(function(transaction) {
    alert('inside show');
transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
var key = "";
       var pair="<tr><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"2\"><center>Email</center></th><th><center>Update</center></th><th><center>Delete</center></th></tr>";
       var i=0;
       var len = results.rows.length, i;
       for (i=0; i<=len-1; i++) {
         key = results.rows.item(i).name;
         pair += "<tr><td><center>"+key+"</center></td><td><center>"+results.rows.item(i).email+"</center></td><td><a class=\"update\" href=\"#myPopupDialog\"  data-custom="+"'"+ key+ "'" +"data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\"><center><i class='fa fa-pencil-square-o'></i></center></a></td><td><a onclick=\"del("+"'"+ key+ "'" +")\"><center><i class='fa fa-trash'></i></center></a></td></tr>";
       }
       if (pair == "<tr><th>Name</th><th>Email</th></tr>") {
         pair += "<tr><td><i>empty</i></td><td><i>empty</i></td></tr>";
       }

}, null);
});

       document.getElementById('myTable').innerHTML = pair;
}


}
    $(document).ready(function() {
        document.addEventListener("deviceready", startApp, true);
    });


*/

document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
    alert('ready');
  var db = window.sqlitePlugin.openDatabase({name: "my.db"});
show();
  db.transaction(function(tx) {
    //alert("inside trans");
    //tx.executeSql('DROP TABLE IF EXISTS test_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS mydata (id integer primary key, name text, email text)');
//alert('after create');

  });

$(document).on('click', '#creat', function(){
   //var title="sundaravel";
    //var desc="phonegap freelancer";
    //alert('hello');
    var name =  $("#name").val();
    //alert(name);
    var email =  $("#email").val();
    db.transaction(function(transaction) {
        //alert('inserted trans');
    var executeQuery = "INSERT INTO mydata (name, email) VALUES (?,?)";
    transaction.executeSql(executeQuery, [name,email]
    , function(tx, result) {
        alert('Name Inserted :' + name + ", Email :" + email);
        show();
    },
    function(error){
        alert('Error occurred');
    });
    });

});

function show(){
//alert('show');
db.transaction(function(transaction) {
    //alert('inside show');
transaction.executeSql('SELECT * FROM mydata', [], function (tx, results) {
  //alert('inside select');
var key = "";
       var pair="<tr><th data-priority=\"1\"><center>Id</center></th><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"2\"><center>Email</center></th><th><center>Update</center></th><th><center>Delete</center></th></tr>";
       var i=0;
       var len = results.rows.length, i;
       //alert(len);
       for (i=0; i<=len-1; i++) {
         key = results.rows.item(i).name;
         id = results.rows.item(i).id;
         //alert("id = "+id);

         //id1 = results.insertId;
         //alert("id1 = "+id1);
         pair += "<tr><td><center>"+id+"</center></td><td><center>"+key+"</center></td><td><center>"+results.rows.item(i).email+"</center></td><td><a class=\"update\" href=\"#myPopupDialog\"  data-custom="+"'"+ id+ "'" +"data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\"><center><i class='fa fa-pencil-square-o'></i></center></a></td><td><a  id=\"delete\" data=\""+id+"\"><center><i class='fa fa-trash'></i></center></a></td></tr>";
       }
       if (pair == "<tr><th>Name</th><th>Email</th></tr>") {
         pair += "<tr><td><i>empty</i></td><td><i>empty</i></td></tr>";
       }
$("#myTable").html(pair);
}, null);
});
//alert('show complete');
       //document.getElementById('myTable').innerHTML = pair;
}

$(document).on('click', '#delete', function(){
var id = $(this).attr("data");
  alert(id);
db.transaction(function(transaction) {
 //var executeQuery = ;
 transaction.executeSql("DELETE FROM mydata where id=?", [id],
 //On Success
  function(tx, result) {
    alert('Delete successfully');
    show();
  },
 //On Error
  function(error){
    alert('Something went Wrong');
  });
 });
});

$(document).on('click', '#upd', function(){
  var id = $("#id").val();
  var name =  $("#uname").val();
  var email =  $("#uemail").val();
   db.transaction(function(transaction) {
 var executeQuery = "";
 transaction.executeSql("UPDATE mydata SET name=?, email=? WHERE id=?", [name,email,id],
 //On Success
 function(tx, result) {alert('Updated successfully');
show();
},
 //On Error
 function(error){alert('Something went Wrong');});
 });
});
$(document).on('click', '.update', function(){
 var id =  $(this).attr('data-custom');
$("#id").val(id);
db.transaction(function(transaction) {
 //var executeQuery = ;
 //transaction.executeSql("SELECT * from mydata where id=?", [data],
 //On Success
  //function(tx, result) {
    transaction.executeSql('SELECT name,email FROM mydata where id=?', [id], function (tx, results) {
    alert('inside successfully');
    alert(id);
    alert(results);
   var name = results.rows.item(0).name;
   var email = results.rows.item(0).email;
   //alert(name);
   //alert(name);
    $("#uname").val(name);
    $("#uemail").val(email);
    //show();
  },
 //On Error
  function(error){
    alert('Something went Wrong');
  });
 });

});

$(document).on('click', '#clearall', function(){
  db.transaction(function(transaction) {
 //var executeQuery = "";
 transaction.executeSql("DELETE FROM mydata", [],
 //On Success
 function(tx, result) {alert('Delete successfully');
show();
},
 //On Error
 function(error){alert('Something went Wrong');});
 });
  });
}
