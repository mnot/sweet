
# Sweet: Setting HTTP Content-Disposition Headers

Getting the syntax for HTTP Content-Disposition headers to work well with browsers well is tricky, especially if you want the filename to contain non-ASCII characters. 

Sweet is here to help. 

It exposes one function - make\_disposition - that returns a value
suitable for use as a Content-Disposition header value.

For example:

```
var http = require('http');
var sweet = require('sweet');

// "my stuff" in Japanese
var cd_value = sweet.make_disposition(
  'attachment', '私のもの', 'my stuff'
);

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Disposition': cd_value
  });
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
```

See [RFC6266](http://tools.ietf.org/html/rfc6266) for the spec and related details.

Note that Sweet is *just* for setting Content-Disposition in HTTP responses (e.g., for file downloads); it won't help with MIME multi-part messages, for example.


## Contact

Mark Nottingham <mnot@mnot.net>

https://github.com/mnot/sweet