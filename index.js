var Lcd = require('lcd'),
  lcd = new Lcd({
    rs: 12,
    e: 21,
    data: [5, 6, 17, 18],
    cols: 8,
    rows: 2
  });

lcd.on('ready', function() {
  setInterval(function() {
    lcd.setCursor(0, 0);
    lcd.print(new Date().toString().substring(16, 24));
  }, 1000);
});

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});
