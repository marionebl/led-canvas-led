(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var arc = Math.PI * 2;

var Led = function() {
  var Led = function Led(x, y, size, enabled) {
    if (enabled === undefined)
      enabled = false;

    this.x = x;
    this.y = y;
    this.size = size;
    this.enabled = enabled;
  };

  Object.defineProperties(Led.prototype, {
    toggle: {
      writable: true,

      value: function(flag) {
          if (typeof flag === 'boolean') {
              this.enabled = flag;
          } else {
              this.enabled = ! this.enabled;
          }

          return this;
      }
    },

    enabled: {
      set: function(state) {
          this.prev = this.enabled;
          this.on = state;
          return this;
      },

      get: function() {
          return this.on;
      }
    },

    render: {
      writable: true,

      value: function(context) {
          if (this.enabled === this.prev) return;
          this.prev = this.enabled;

          context.save();

          var _x = this.x*this.size;
          var _y = this.y*this.size;
          var _radius = this.size/2;
          var _inner = _radius - this.size/7.5;

          if (typeof this.prev !== 'undefined') {
              context.clearRect(_x, _y, this.size, this.size);
          }

          context.beginPath();
          context.arc(_x + _radius, _y + _radius, _inner, 0, arc);
          context.fillStyle = this.enabled ? 'rgba(255,255,255,1)':'rgba(255,255,255,.1)';

          if (this.enabled) {
              context.shadowColor = 'rgba(255,255,255,1)';
              context.shadowBlur = _radius - _inner;
          }

          context.fill();
          context.restore();
      }
    }
  });

  return Led;
}();

module.exports = Led;


},{}]},{},[1]);
