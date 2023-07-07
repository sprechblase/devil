/*
MIT License

Copyright (c) 2023 Samuel Krebs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; SameSite=None; Path=/; Secure";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    // the following code allows multiple cookie values and splits them apart
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var dropdownOpened = false;

function toggleDropdown(){
  if(dropdownOpened == false){
    document.getElementById("dropdown").style.display = "block";
    dropdownOpened = true;
  }else if(dropdownOpened == true){
    document.getElementById("dropdown").style.display = "none";
    dropdownOpened = false;
  }
}

function switchClicked(){
  if (document.querySelector("html").getAttribute("data-dark-mode") == null) {
    document.getElementById('lgo').src = "assets/data/img/logo1_white-scaled.png";
    console.log("Debug: darkmode");
    document.querySelector("html").toggleAttribute("data-dark-mode");
    setCookie('main_darkmode', "0", 7);
  }else{
    document.getElementById('lgo').src = "assets/data/img/logo1-scaled.png";
    console.log("Debug: whitemode");
    document.querySelector("html").toggleAttribute("data-dark-mode");
    setCookie('main_darkmode', "1", 7);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  if(getCookie('main_darkmode') == "0"){
      document.getElementById('lgo').src = "assets/data/img/logo1_white-scaled.png";
      document.querySelector("html").toggleAttribute("data-dark-mode");
      console.log("Debug: darkmode");
      document.getElementById("checkbox").checked = true;
  }
});
