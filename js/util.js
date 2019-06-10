'use strict'

function doUploadImg(elForm, onSuccess) {
  const formData = new FormData(elForm);

  fetch('http://ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(onSuccess)
    .catch(error => console.log(error));
}

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));