var Rebase = require('re-base');
var config = {
    apiKey: "AIzaSyBHmoLhq-ZzBpmdUhYAiI7Bd07EGolmte4",
    authDomain: "friendlychat-215fb.firebaseapp.com",
    databaseURL: "https://friendlychat-215fb.firebaseio.com",
    projectId: "friendlychat-215fb",
    storageBucket: "friendlychat-215fb.appspot.com",
    messagingSenderId: "370540900808"
  };

  var base = Rebase.createClass(config);
  export default base;
