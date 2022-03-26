function checkFile() {
  	document.querySelector("#searchForm").submit();
}
function getURLInput(event) {
	urlInput = document.getElementById("urlInput");
	urlInput.value = event.dataTransfer.getData("text/uri-list");
	console.log(urlInput.value)
	document.querySelector("#searchForm").submit();
}
document.onpaste = function (event) {
  urlInput = document.getElementById("urlInput");
  if (event.target == urlInput) {
    //don't interfere with paste to url box - allows ios to paste image links properly
    //give some time for paste to finish normally before checking
    setTimeout(function () {
      getURLInput(urlInput);
    }, 4);
    return;
  } else {
    event.preventDefault();
    clipboardData = event.clipboardData || event.originalEvent.clipboardData;
    if (typeof clipboardData.files[0] == "undefined") {
      urlInput.value = clipboardData.getData("Text");
      getURLInput(urlInput);
    } else {
      fileInput = document.getElementById("fileInput");
      fileInput.files = clipboardData.files;
      checkFile(fileInput);
    }
  }
};
document.ondragover = document.ondragenter = function (event) {
  event.preventDefault();
};
document.ondrop = function (event) {
  fileInput = document.getElementById("fileInput");
  if (event.target == fileInput) {
    //don't interfere with drop on file select - allows old browsers to drop properly
    //console.log("skipped drop!");
    return;
  } else {
    event.preventDefault();
    if (typeof event.dataTransfer.files[0] == "undefined") {
      urlInput = document.getElementById("urlInput");
      urlInput.value = event.dataTransfer.getData("text/uri-list");
	  console.log(urlInput.value)
      getURLInput(urlInput);
    } else {
      fileInput = document.getElementById("fileInput");
      fileInput.files = event.dataTransfer.files;
      checkFile(fileInput);
    }
  }
};
