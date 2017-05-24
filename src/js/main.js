/**
* Scripts for Portfolio
*
* author: Nick Nelson (S247742)
* website: nicknelson.io
*/

import TransitionManager from "./lib/TransitionManager";
import EmailHide from "./lib/EmailHide";

var transitionManager = new TransitionManager();

var emailHide = new EmailHide();
setInterval(function() {
    emailHide.unhide("email@nicknelson.io", "Hello");
}, 1000);