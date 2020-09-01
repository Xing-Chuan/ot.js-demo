/*global ot */

ot.SocketIOAdapter = (function () {
  'use strict';

  function SocketIOAdapter (socket) {
    this.socket = socket;

    var self = this;
    // 观察远端发送过来的操作
    socket
      .on('client_left', function (clientId) {
        self.trigger('client_left', clientId);
      })
      .on('set_name', function (clientId, name) {
        self.trigger('set_name', clientId, name);
      })
      .on('ack', function () { self.trigger('ack'); })
      .on('operation', function (clientId, operation, selection) {
        self.trigger('operation', operation);
        self.trigger('selection', clientId, selection);
      })
      .on('selection', function (clientId, selection) {
        self.trigger('selection', clientId, selection);
      })
      .on('reconnect', function () {
        self.trigger('reconnect');
      });
  }

  // 发送本地操作
  SocketIOAdapter.prototype.sendOperation = function (revision, operation, selection) {
    // console.log('socket.client.sendOperation ->', {
    //   revision, operation, selection,
    // });
    this.socket.emit('operation', revision, operation, selection);
  };

  // 发送当前光标所处位置
  SocketIOAdapter.prototype.sendSelection = function (selection) {
    // console.log('socket.client.sendSelection ->', {
    //   selection,
    // });
    this.socket.emit('selection', selection);
  };

  // 注册远端Client操作的处理事件
  SocketIOAdapter.prototype.registerCallbacks = function (cb) {
    this.callbacks = cb;
  };

  // 分发不同的远端Client操作给对应方法处理
  SocketIOAdapter.prototype.trigger = function (event) {
    console.log('SocketIOAdapter.trigger ->', event);
    var args = Array.prototype.slice.call(arguments, 1);
    var action = this.callbacks && this.callbacks[event];
    if (action) { action.apply(this, args); }
  };

  return SocketIOAdapter;

}());