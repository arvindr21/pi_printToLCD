var Lcd = require('lcd'),
  lcd = new Lcd({
    rs: 12,
    e: 21,
    data: [5, 6, 17, 18],
    cols: 16,
    rows: 1
  });

lcd.on('ready', function() {
  lcd.setCursor(16, 0);
  lcd.autoscroll();
  print('Hello, World! ** ');
});

function print(str, pos) {
  pos = pos || 0;

  if (pos === str.length) {
    pos = 0;
  }

  lcd.print(str[pos]);

  setTimeout(function() {
    print(str, pos + 1);
  }, 300);
}

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});
