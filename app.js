function startChat() {
  document.getElementById('chatPanel').removeAttribute('style');
  document.getElementById('divstart').setAttribute('style', 'display:none');
  hideChatlist()
}

function showChatlist() {
  document.getElementById('side-1').classList.remove('d-none', 'd-md-block');
  document.getElementById('side-2').classList.add('d-none');
}
function hideChatlist() {
  document.getElementById('side-1').classList.add('d-none', 'd-md-block');
  document.getElementById('side-2').classList.remove('d-none');
}

function onKeydown() {
  document.addEventListener('keydown', function (key) {
    if (key.which === 13) {
      sendMessage();
    }
  })
}
function sendMessage() {
  var message = ` <div class="row justify-content-end">

    <div class="col-6 col-sm-7 col-md-7">
        <p class="sent float-right">
      ${document.getElementById('txtmessage').value}
            <span class="time ">1:33 am</span>
        </p>

    </div>
     
    <div class="col-2 col-sm-1 col-md-1">
        <img src="jawwad.jpg" class="chatprofile" alt="">
      

    </div>`;
  document.getElementById('messages').innerHTML += message;
  document.getElementById('txtmessage').value = ''
  document.getElementById('txtmessage').focus();


  document.getElementById('messages').scrollTo(0, document.getElementById('messages').clientHeight);
}







function signIn() {

  // var provider = new firebase.auth.FacebookAuthProvider();
  // firebase.auth().signInWithPopup(provider).then(function(result) {

  //   var token = result.credential.accessToken;
  //   var user = result.user;
  //   console.log("user==> ",user.displayName , user.photoURL)
  // }).catch(function(error) {
  //   console.log("error===>",error.message)
  // });



  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);









  function onFirebaseStateChanged() {
    firebase.auth().onAuthStateChanged(onStateChanged);
  }

  function onStateChanged(user) {
    if (user) {
      var userProfile = { email: '', name: '', photoURL: '' }
      userProfile.email = firebase.auth().currentUser.email;
      userProfile.name = firebase.auth().currentUser.displayName;
      userProfile.photoURL = firebase.auth().currentUser.photoURL;

      firebase.database().ref('user').push(userProfile, callback);
      document.getElementById('lnkNewChat').classList.remove('disabled')


    }
    else {
      document.getElementById('imgprofile').src = 'jawwad.jpg';
      document.getElementById('imgprofile').title = " ";


      document.getElementById('linksignIn').style = '';
      document.getElementById('linksignOut').style = 'display:none;';
      document.getElementById('lnkNewChat').classList.add('disabled')
    }


  }
  function callback(error) {
    if (error) {
      alert(error)
    }
    else {

      document.getElementById('imgprofile').src = firebase.auth().currentUser.photoURL;
      document.getElementById('imgprofile').title = firebase.auth().currentUser.displayName;


      document.getElementById('linksignIn').style = 'display:none';
      document.getElementById('linksignOut').style = '';
    }

  }



  onFirebaseStateChanged();



}
function signOut() {
  firebase.auth().signOut();

}




function populateFreindList() {
  var lst = '';
  document.getElementById('lstFreind').innerHTML = `<div class="text-center">
                                        <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem;"></span>
                                                                   </div>`

  var db = firebase.database().ref('user');
  db.on('value', function (user) {
    if (user.hasChildren()) {
      lst = `<li style="background-color: #f8f8f8;" class="list-group-item  ">
     <input type="text" placeholder="search or new chat....? " class="form-control">
 </li>`;
    }
    user.forEach(function (data) {
      var user = data.val();
      if(user.email===firebase.auth().currentUser.email){
        lst += `<li onclick="startChat('${data.key}','$')" class="list-group-item data-dismiss="modal";  list-group-item-action">
     <div class="row">
         <div class="col-md-2">
             <img src="${user.photoURL}" class="profile" alt="">

         </div>
         <div class="col-md-10">
             <div class="name">${user.name}</div>
             

         </div>
     </div>
     </li>`

      }
      
    })
    document.getElementById('lstFreind').innerHTML=lst;



  })
}




