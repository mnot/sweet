/*
Generate a HTTP Content-Disposition field-value.  

'disposition' should be one of "inline" or "attachment".

'filename' should be a unicode string.

'filename_fallback' should be a string containing only ASCII characters that
is semantically equivalent to 'filename'. If the filename is already ASCII,
it can be omitted, or just copied from 'filename'.

Returns a string suitable for use as a Content-Disposition field-value.

Returns null upon an error.
*/

function make_disposition(disposition, filename, filename_fallback) {
  if (! filename_fallback) {
    filename_fallback = filename;
  }

  if (! (/^[\u0020-\u007e]*$/).test(filename_fallback)) {
    return null; // filename_fallback is not ASCII.
  }
  
  if (/%/.test(filename_fallback)) {
    return null; // percent characters aren't safe in fallback.
  }

  if (! validate_filename(filename) || 
      ! validate_filename(filename_fallback)) {
        return null; // path separators aren't allowed in either.
      }

  var output = disposition + 
    '; filename="' + 
    escape_filename(filename_fallback) + 
    '"';

  if (filename != filename_fallback) {
    output += "; filename*=utf-8''" + encode_filename(filename);
  }
  return output;
}

function validate_filename(filename) {
  return ! (/[\/\\]/.test(filename));
}

function escape_filename(filename) {
  return filename
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function encode_filename(filename) {
  return encodeURIComponent(filename)
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

exports.make_disposition = make_disposition;