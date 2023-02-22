//Variables DOM
const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

//Function will be called when the button is clicked
downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading File...";
    fetchFile(fileInput.value);
});

//This function below has the function of taking the URL of the input and downloading the value of the URL
function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/,'');
        document.body.appendChild(aTag);
        console.log(file)
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download File";
    }).catch(() => {
        //If the download does not go as expected, an error message will appear.
        downloadBtn.innerText = "Download File";
        alert("Failed to download file");
    })
}