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
window.onload = () => {
  const highScoreElement = document.getElementById('highscore');
  const checkSync = document.getElementById('checkSync');
  const colorPicker = document.getElementById('colorPicker');
  const colorBox = document.querySelector("#colorBox");

  function hexToRgb(hex) {
  	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  	return result
  		? {
  				r: parseInt(result[1], 16),
  				g: parseInt(result[2], 16),
  				b: parseInt(result[3], 16)
  		  }
  		: null;
  }

  let highScore = 0;
  let round = 1;
  let targetColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
  colorBox.style.backgroundColor = targetColor;

  colorPicker.addEventListener("input", () => {
  	checkSync.style.backgroundColor = colorPicker.value.toUpperCase();
  });

  checkSync.addEventListener("click", () => {
    const pickedColor = colorPicker.value.toUpperCase();
    const targetRgb = hexToRgb(targetColor);
    const pickedRgb = hexToRgb(pickedColor);
    const distance = Math.sqrt(Math.pow(targetRgb.r - pickedRgb.r, 2) + Math.pow(targetRgb.g - pickedRgb.g, 2) + Math.pow(targetRgb.b - pickedRgb.b, 2));
    const roundScore = Math.max(0, Math.round((1 - distance / Math.sqrt(3 * Math.pow(255, 2))) * 1000));

    highScore += roundScore;
    highScoreElement.textContent = "Highscore: \n" + highScore;

    targetColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    colorBox.style.backgroundColor = targetColor;

    round++;
  });
}
