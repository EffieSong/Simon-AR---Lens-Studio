// -----JS CODE-----
// @input Component.ScriptComponent leftEyeTrigger
// @input Component.ScriptComponent rightEyeTrigger
// @input string leftEyeBlinkTrigger = "takeABite"
// @input string rightEyeBlinkTrigger = "takeABite"



var once=false;

function onUpdate(){
    if ( script.leftEyeTrigger.api.trigger && !script.rightEyeTrigger.api.trigger){
        if(!once){
           // print("left blink");
            once=true;
            sleep.reset(0.2);
            global.behaviorSystem.sendCustomTrigger(script.leftEyeBlinkTrigger);
        }
    }
    
    if (script.rightEyeTrigger.api.trigger && !script.leftEyeTrigger.api.trigger){
        if(!once){ 
           // print("right ");
            once=true;
            sleep.reset(0.2);  
            global.behaviorSystem.sendCustomTrigger(script.rightEyeBlinkTrigger);
        }
      
       // print(once);
    }
}

// Wait for a period of time before executing a function
var sleep = script.createEvent("DelayedCallbackEvent");
sleep.bind(function()
{ 
    once=false;
});

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

