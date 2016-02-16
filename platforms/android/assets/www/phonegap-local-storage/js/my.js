$(document).on('click', '.update', function(){
 var data =  $(this).attr('data-custom');
$("#uname").val(data);
} );
function create(){
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem(name, email);
  }
  else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
  show();
}
function show(){
       var key = "";
       var pair="<tr><th data-priority=\"1\"><center>Name</center></th><th data-priority=\"2\"><center>Email</center></th><th><center>Update</center></th><th><center>Delete</center></th></tr>";
       var i=0;
       for (i=0; i<=localStorage.length-1; i++) {
         key = localStorage.key(i);
         pair += "<tr><td><center>"+key+"</center></td><td><center>"+localStorage.getItem(key)+"</center></td><td><a class=\"update\" href=\"#myPopupDialog\"  data-custom="+"'"+ key+ "'" +"data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\"><center><i class='fa fa-pencil-square-o'></i></center></a></td><td><a onclick=\"del("+"'"+ key+ "'" +")\"><center><i class='fa fa-trash'></i></center></a></td></tr>";
       }
       if (pair == "<tr><th>Name</th><th>Email</th></tr>") {
         pair += "<tr><td><i>empty</i></td><td><i>empty</i></td></tr>";
       }
       document.getElementById('myTable').innerHTML = pair;
}
function update(){
  var name = document.getElementById("uname").value;
  var email = document.getElementById("uemail").value;
   if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem(name, email);
}
show();
}
function clearall(){
  localStorage.clear();
  show();
}
function del(name){
  localStorage.removeItem(name);
  show();
}
