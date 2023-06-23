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

let startamnt = 236000000000;
let amnt = startamnt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

function decreaseMoney(amount){
  startamnt = startamnt - amount;
  let amnt = startamnt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  document.getElementById('game-money').innerHTML = "$ " + amnt;
  console.log(amnt);
  document.getElementById('game-percentage').innerHTML = ((startamnt / 236000000000) * 100).toString().substring(0,6) + "%";
  if(startamnt < 1){
    document.getElementById('game2').style.background = "radial-gradient(circle at 0.2% 1.8%, rgb(255, 90, 8) 0%, rgb(88, 0, 0) 100.2%)";
  }
}

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('game-money').innerHTML = "$ " + amnt;
});
