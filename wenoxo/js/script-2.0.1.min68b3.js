function selfXssMessage() {
    "use strict";
    setTimeout(console.log.bind(console, "\n%cStop!", "color:red;font-size:50px;font-weight:bold;text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;")),
    selfXss && "" !== selfXss.message ? setTimeout(console.log.bind(console, "\n", selfXss.message)) : setTimeout(console.log.bind(console, "This is a browser feature intended for developers. If someone told you to copy and paste something here, it is a scam and will give them access to your browser data like %cpasswords, bank information", "color:red;", "etc. so avoid to do that if you are not a developer and don't have an understanding of what you are copying and pasting here."))
}
document.addEventListener("DOMContentLoaded", selfXssMessage);
