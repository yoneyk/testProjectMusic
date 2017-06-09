window.onload = function () {
  document.getElementById("show_button").style.display = 'none';
  document.getElementById("selectedImageSection").style.display = 'none';
  var id = [271256, 1698308, 15885, 95705522, 63346553, 463009, 64387566, 102834, 320569549, 278873078];//154185311 - mandisa

  var f = (function() {
    //scope a - using closure
    var xhr = [];
    var response = [];
    for (i = 0; i < id.length; i++){
        (function (i) {
            xhr[i] = new XMLHttpRequest();
            trackURL = 'https://itunes.apple.com/lookup?' + '&id=' + id[i];
            xhr[i].open("GET", trackURL, true);
            xhr[i].onreadystatechange = function () {
                //scope b
                if (xhr[i].readyState == 4 && xhr[i].status == 200) {
                    var trackResponse = JSON.parse(xhr[i].responseText);
                    response.push(trackResponse);
                    //console.log(response);
                    callMe(response);
                }
            };
            xhr[i].send();
        })(i);
    }
  })();
}

function callMe(trackResponse){
  var myNum = 1;
  for(var i = 0; i < trackResponse.length; i++){
      var artist_table = "<table border='1|1'>";
          artist_table+="<tr>";
              artist_table+="<th>"+'No.'+"</td>";
              artist_table+="<th>"+'Artist Name'+"</th>";
              artist_table+="<th>"+'Genre'+"</th>";
              artist_table+="<th>"+'Link URL'+"</th>";
              artist_table+="<th>"+'...'+"</th>";
          artist_table+="</tr>";
          for(var i = 0; i < trackResponse.length; i++){
              artist_table+="<tr>";
                  artist_table+="<td>"+ myNum +"</td>";
                  artist_table+="<td>" + trackResponse[i].results[0].artistName + "</td>";
                  artist_table+="<td>"+trackResponse[i].results[0].primaryGenreName+"</td>";
                  artist_table+="<td>"+trackResponse[i].results[0].artistLinkUrl+"</td>";
                  artist_table+="<td>"+'<input id = "artist_input" type="button" value="view details" onclick="getArtistDetails(\''+trackResponse[i].results[0].artistName+'\')"/>'+"</td>";
              artist_table+="</tr>";
              myNum++;
          }
      artist_table+="</table>";
      document.getElementById("artist_table").innerHTML = artist_table;
  }
}

function getArtistDetails(id){
  console.log(id);
  document.getElementById("artist_area").style.display = 'none';
  document.getElementById("detail").style.display = 'block';
  var iTunesURL = 'https://itunes.apple.com/search?limit=8' + '&term=' + id;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  }
  xmlhttp.open("GET", iTunesURL, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var iTunesResponse = JSON.parse(xmlhttp.responseText);
        //console.log(iTunesResponse);
        var artistImg = document.getElementById("imgArtist");
        var artistName = document.getElementById("name");
        var genre = document.getElementById("artistGenre");
        artistImg.src = iTunesResponse.results[0].artworkUrl30;
        artistName.innerHTML = iTunesResponse.results[0].artistName;
        genre.innerHTML = iTunesResponse.results[0].primaryGenreName;

        for (var i = 0; i < iTunesResponse.results.length; i++) {
            collectionId = iTunesResponse.results[i].collectionId;
            var src = iTunesResponse.results[i].artworkUrl30;
            document.getElementById("gallery-photo").style.display = 'block';
            document.getElementById("gallery-photo").style.cursor = 'pointer';


            var list = document.createElement("li");
            var img = document.createElement("img");
            img.src = iTunesResponse.results[i].artworkUrl30;
            img.width = '100';
            img.height = '100';
            img.id = iTunesResponse.results[i].collectionId;
            list.appendChild(img);
            document.getElementById('photolist').appendChild(list);

            var photoListElement = document.getElementById("photolist").getElementsByTagName('li');
            for(var i = 0; i<photoListElement.length; i++){
                var imgElement = photoListElement[i];
                imgElement.onclick = function(object){
                    document.getElementById("selectedImageSection").style.display = 'block';
                    document.getElementById("selected-photo").style.display = 'block';
                    document.getElementById("detail").style.display = 'none';
                    if (object.target.tagName == 'IMG') {
                      var id = object.target.getAttribute("id");
                      var trackURL = 'https://itunes.apple.com/lookup?entity=song' + '&id=' + id;
                      xmlhttp.open("GET", trackURL, true);
                      xmlhttp.send();
                      xmlhttp.onreadystatechange = function () {
                          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                              var trackResponse = JSON.parse(xmlhttp.responseText);
                              console.log(trackResponse);
                              var trackImg = document.getElementById("imgTrack");
                              var artist_name = document.getElementById("artist_name");
                              var coll_name = document.getElementById("coll_name");
                              var coll_price = document.getElementById("coll_price");
                              var coll_genre = document.getElementById("coll_genre");
                              var coll_copyright = document.getElementById("coll_copyright");
                              var coll_released = document.getElementById("date_released");
                              var trackNo = document.getElementById("track_count");
                              var coll_explicit = document.getElementById("coll_explicit");
                              var coll_type = document.getElementById("coll_type");
                              var coll_country = document.getElementById("coll_country");
                              var coll_currency = document.getElementById("coll_currency");

                              trackImg.src = trackResponse.results[0].artworkUrl60;
                              artist_name.innerHTML = trackResponse.results[0].artistName;
                              coll_name.innerHTML = trackResponse.results[0].collectionName;
                              coll_price.innerHTML = trackResponse.results[0].collectionPrice;
                              coll_genre.innerHTML = trackResponse.results[0].primaryGenreName;
                              coll_copyright.innerHTML = trackResponse.results[0].copyright;
                              coll_released.innerHTML = trackResponse.results[0].releaseDate;
                              trackNo.innerHTML = trackResponse.results[0].trackCount;
                              coll_explicit.innerHTML = trackResponse.results[0].collectionExplicitness;
                              coll_type.innerHTML = trackResponse.results[0].collectionType;
                              coll_country.innerHTML = trackResponse.results[0].country;
                              coll_currency.innerHTML = trackResponse.results[0].currency;

                              for(var i = 0; i < trackResponse.results.length; i++){
                                  var track_table = "<table border='1|1'>";
                                  track_table+="<tr>";
                                      track_table+="<th>"+'Track No.'+"</td>";
                                      track_table+="<th>"+'Track Name'+"</td>";
                                      track_table+="<th>"+'Artist Name'+"</th>";
                                      track_table+="<th>"+'Time'+"</th>";
                                      track_table+="<th>"+'Price'+"</th>";
                                  track_table+="</tr>";
                                  for(i=0;i<trackResponse.results.length;i++){
                                      var ms = trackResponse.results[i].trackTimeMillis;
                                      ms = 1000*Math.round(ms/1000); // round to nearest second
                                      var d = new Date(ms);
                                      var inMinutes = d.getUTCMinutes() + ':' + d.getUTCSeconds();
                                      if(trackResponse.results[i].trackName !== undefined){
                                          track_table+="<tr>";
                                              track_table+="<td>"+trackResponse.results[i].trackNumber+"</td>";
                                              track_table+="<td>"+trackResponse.results[i].trackCensoredName+"</td>";
                                              track_table+="<td>"+trackResponse.results[i].artistName+"</td>";
                                              track_table+="<td>"+inMinutes+"</td>";
                                              track_table+="<td>"+trackResponse.results[i].trackPrice+"</td>";
                                          track_table+="</tr>";
                                      }
                                  }
                                  track_table+="</table>";
                                  document.getElementById("track_table").innerHTML = track_table;
                              }
                          }
                      }
                    }
                }
            }
        }
      }
  }
}


function clearSearchField() {
  document.getElementById("search_text").value = "";
  document.getElementById("search_text").focus();
}

function backToImageList(){
  document.getElementById("detail").style.display = 'block';
  document.getElementById("selectedImageSection").style.display = 'none';
}

function backToTableList(){
  window.location.reload();
  document.getElementById("detail").style.display = 'none';
  document.getElementById("artist_area").style.display = 'block';
}
