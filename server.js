var router = require('tiny-router');
var fs = require('fs');

var Lcd = require('lcd');
var lcd = new Lcd({
  rs: 12,
  e: 21,
  data: [5, 6, 17, 18],
  cols: 16,
  rows: 1
});

lcd.blink();

router.get('/', function(req, res) {
  fs.readFile('./index.html', 'utf8', function(err, contents) {
    if (err) {
      return console.log(err);
    }
    res.send(contents);
  });
});

router.get('/print/{text}', function(req, res) {
  var text = req.body.text;

  lcd.clear();
  lcd.setCursor(0, 0);

  print(decodeURI(text));

  res.send({
    status: true,
    text: text
  });
});


router.listen(2000);
console.log('Server listening on port 2000');

var timer;

function print(str, pos) {

  pos = pos || 0;

  timer = setTimeout(function() {
    if (pos === str.length - 1) {
      clearTimeout(timer);
      str = '';
    } else {
      print(str, pos + 1);
    }
  }, 300);

  lcd.print(str[pos]);
}

// If ctrl+c is hit, clear, free resources and exit.

process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});
