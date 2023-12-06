// https://www.w3schools.com/js/js_json_http.asp
function request_data(title) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(this.responseText).speakers[0];
          // https://www.w3schools.com/jquery/html_html.asp
          $('#month').html(data.month);
          $('#speaker').html(data.speaker);
          $('#title').html(data.title);
          $('#text').html(data.text);
          // https://stackoverflow.com/questions/554273/changing-the-image-source-using-jquery
          $('#image').attr("src", data.image);
      }
  };
  req.open('GET', './json_files/' + title + '.json');
  req.send();
}

$(document).ready(function() {

  $('#toobin').click(function(e) {
      request_data(e.currentTarget.title);
  });
  $('#sorkin').click(function(e) {
      request_data(e.currentTarget.title);
  });
  $('#chua').click(function(e) {
      request_data(e.currentTarget.title);
  });
  $('#sampson').click(function(e) {
      request_data(e.currentTarget.title);
  });

}); // end ready

