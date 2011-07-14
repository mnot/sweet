
# Sweet: Setting HTTP Content-Disposition Headers

Getting the syntax for HTTP Content-Disposition headers to work well with browsers well is tricky, especially if you want the filename to contain non-ASCII characters. 

Sweet is here to help. 

It exposes one function - make\_disposition ( disposition, filename, fallback )- that takes the disposition ("attachment" or "inline"), a filename (possibly non-ASCII) and a fallback filename (always ASCII). and returns a value
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

### Frequently Asked Questions

#### Why shouldn't I just produce the C-D header in UTF-8 directly?

HTTP headers are defined to be ISO-8859-1, so encoding them as UTF-8 assumes that the client will correctly "sniff" the encoding.

Unfortunately, there are some UTF-8 characters that look like ISO-8859-1 characters, such as an a with an umlaut (ä). In these cases, some browsers will treat it as UTF-8, even though it's valid ISO-8859-1, causing a loss of interoperability; your users will see the wrong filename.

#### How will browsers treat Sweet's Content-Disposition headers?

If you're generating non-ASCII filenames, all current releases of mainstream browsers will see it, except for Safari (which falls back to the ASCII filename).

Internet Explorer versions 6, 7 and 8, as well as Mozilla 3, 3.5 and 4 will also use the ASCII filename.

See [the browser tests](http://greenbytes.de/tech/tc2231/) for more detail.


## Contact

Mark Nottingham <mnot@mnot.net>

https://github.com/mnot/sweet