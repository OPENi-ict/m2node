// Generated by CoffeeScript 1.9.1
(function() {
  var MongrelRequest;

  MongrelRequest = (function() {
    function MongrelRequest(messageBuffer) {
      var bodyNS, headersAndBody, message, rawHeaders, ref, ref1;
      message = messageBuffer.toString();
      ref = this._splitString(message, ' ', 4), this.uuid = ref[0], this.connectionId = ref[1], this.path = ref[2], headersAndBody = ref[3];
      ref1 = this._parseNetstring(headersAndBody), rawHeaders = ref1[0], bodyNS = ref1[1];
      this.body = this._parseNetstring(bodyNS)[0];
      this.headers = JSON.parse(rawHeaders);
    }

    MongrelRequest.prototype.toFullHttpRequest = function() {
      var k, ref, request, v;
      request = [];
      request.push(this.headers.METHOD + ' ' + this.headers.URI + ' HTTP/1.1\r\n');
      ref = this.headers;
      for (k in ref) {
        v = ref[k];
        if (k.match(/^[^A-Z]+$/)) {
          request.push(k + ": " + v + "\r\n");
        }
      }
      request.push("\r\n");
      request.push(this.body);
      return new Buffer(request.join(''));
    };

    MongrelRequest.prototype._parseNetstring = function(netstring) {
      var data, length, ref;
      ref = this._splitString(netstring, ':', 2), length = ref[0], data = ref[1];
      return [data.slice(0, parseInt(length)), data.slice(parseInt(length) + 1)];
    };

    MongrelRequest.prototype._splitString = function(string, delimiter, limit) {
      var result;
      result = string.split(delimiter);
      return result.slice(0, limit - 1).concat([result.slice(limit - 1).join(delimiter)]);
    };

    return MongrelRequest;

  })();

  exports.MongrelRequest = MongrelRequest;

}).call(this);
