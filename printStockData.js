var http = require('http');
var Lcd = require('lcd');

var lcd = new Lcd({
  rs: 12,
  e: 21,
  data: [5, 6, 17, 18],
  cols: 16,
  rows: 1
});

function getQuote(stock) {
  http.get({
    host: 'www.google.com',
    port: 80,
    path: '/finance/info?client=ig&q=' + stock
  }, function(response) {
    response.setEncoding('utf8');
    var data = "";

    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      if (data.length > 0) {
        try {
          var data_object = JSON.parse(data.substring(3));
        } catch (e) {
          return;
        }

        var quote = {};
        quote.ticker = data_object[0].t;
        quote.exchange = data_object[0].e;
        quote.price = data_object[0].l_cur;
        quote.change = data_object[0].c;
        quote.change_percent = data_object[0].cp;
        quote.last_trade_time = data_object[0].lt;
        quote.dividend = data_object[0].div;
        quote.yield = data_object[0].yld;

        console.log(JSON.stringify(quote, null, 4));

        lcd.setCursor(16, 0);
        lcd.autoscroll();
        var text = "Ticker : " + quote.ticker + " , Price : " + quote.price + " , Change(%) : " + quote.change_percent + " ** ";
        print(text);

      }
    });
  });
}

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

// If ctrl+c is hit, clear, free resources and exit.
process.on('SIGINT', function() {
  lcd.clear();
  lcd.close();
  process.exit();
});

getQuote('goog');
