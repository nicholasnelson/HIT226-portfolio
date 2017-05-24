/**
 * @license
 * Copyright (c) 2017 Nicholas Nelson (S247742)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
 
/*
 *  A class to dynamically turn a multi page site into a coherent single-page experience
 */
class TransitionManager {
  constructor() {
    
    // Default to first screen
    this._currentActive = document.querySelector('div.transition-screen');
    
    this._scanLinks(document);
    
    
  }
  
  _scanLinks(targetDiv) {
    // First load any required links into the document
    var transitionLinks = targetDiv.querySelectorAll("[transition-direction]");

    for (var el of transitionLinks) {
      var url = el.getAttribute("href");
      // Check for existing target div for this url
      var transitionScreen = document.querySelector('div.transition-screen[transition-url="' + url + '"]');

      // If we didn't find a target, create one
      if(!transitionScreen) {
        var req = new XMLHttpRequest();
        var method = "GET";
        
        // Create element for the screen
        transitionScreen = document.createElement("div");
        transitionScreen.classList.add("transition-screen");
        transitionScreen.setAttribute("transition-url", url);
        document.body.appendChild(transitionScreen);
        
        // Request the page, callback loads the page into the transitionScreen div
        req.open(method, url, true);
        req.onreadystatechange = function (req, target) {
            if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
              var doc = document.implementation.createHTMLDocument(req.responseURL);
              doc.documentElement.innerHTML = req.responseText;
              target.innerHTML = doc.body.innerHTML;
              // Run scanLinks again on new div
              this._scanLinks(target);
            }
        }.bind(this, req, transitionScreen);
        req.send();
      }
  
      // Setup click handler based on existing / new target div
      el.href = "#";
      el.onclick = this.moveTo
          .bind(this,
              transitionScreen,
              el.getAttribute('transition-direction'));
    }
    
  }

  // Close the active transition-screen and open a new one
  moveTo(newActive, animateDirection) {
    var fromSide, toSide;
    
    switch (animateDirection) {
      case "down": 
        fromSide = "bottom";
        toSide = "top";
        break;
      case "up": 
        fromSide = "top";
        toSide = "bottom";
        break;
      case "left": 
        fromSide = "left";
        toSide = "right";
        break;
      case "right": 
        fromSide = "right";
        toSide = "left";
        break;
      default:
        throw new Error("Invalid direction: " + animateDirection);
    }
    // Put newActive in correct position without using transition effects
    newActive.classList.add("no-transition");
    newActive.setAttribute("transition", fromSide);
    /* Force reflow before we remove no-transition
     * Thanks to Mark Amery on Stackoverflow for this answer */
    newActive.offsetHeight; // Reflow voodoo here
    newActive.classList.remove("no-transition");
    // Start closing currentActive
    this._currentActive.setAttribute("transition", toSide);
    // Start opening newActive, with transition effect
    newActive.setAttribute("transition", "open");
    
    this._currentActive = newActive;
  
  }
  
}

export { TransitionManager as default };