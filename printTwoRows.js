var Lcd = require('lcd'),
  lcd = new Lcd({
    rs: 12,
    e: 21,
    data: [5, 6, 17, 18],
    cols: 16,
    rows: 2
  }); // Pi


lcd.on('ready', function() {
  lcd.setCursor(0, 0); // col 0, row 0
  lcd.print(new Date().toISOString().substring(11, 19)); // print time
  lcd.once('printed', function() {
    lcd.setCursor(0, 1); // col 0, row 1
    lcd.print(new Date().toISOString().substring(0, 10)); // print date
    lcd.once('printed', function() {
      lcd.clear();
      lcd.close();
    });
  });
});
