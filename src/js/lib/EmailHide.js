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
 * A tool to insert an email address into a webpage
 * Avoids having to include the email in the HTML where it could be found by
 *  spammy spammy web-crawlers
 */
class EmailHide {
  unhide(email, subject) {
    var emailTextFields = document.querySelectorAll(".emailhide-text");
    var emailHrefs = document.querySelectorAll(".emailhide-href");
    console.log(emailTextFields);
    for (var el of emailTextFields) {
      el.innerHTML = email;
    }
    
    for (var el of emailHrefs) {
      el.href = "mailto:" + email + "?Subject=" + subject;
    }
  }
}

export { EmailHide as default };



