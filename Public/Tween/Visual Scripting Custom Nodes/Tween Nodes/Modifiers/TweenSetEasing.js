// TweenSetEasing.js
// Version: 1.0.0
// Use as a Visual Scripting node
// Description: Tween modifier
//
// @input tweenObj tweenIn
// @input function float(float t) easingFunc
// @output tweenObj tweenOut

script.tweenOut = script.easingFunc
    ? script.tweenIn.easing(script.easingFunc)
    : script.tweenIn;