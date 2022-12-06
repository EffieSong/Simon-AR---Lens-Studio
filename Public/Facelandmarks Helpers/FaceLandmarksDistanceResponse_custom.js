// -----JS CODE-----
// MouthOpenThenCloseResponse.js
// Event: Lens Initialized
// Description: Configure a trigger and response. Translate data from MouthOpenThenCloseTrigger.js script to the response

// @input Component.ScriptComponent triggerScript {"label":"Trigger Script"}
// @ui {"widget":"separator"}

//@input string onCustomTriggerTriggerName {"label": "Trigger Name"}

//@ui {"widget": "group_start", "label": "Sound Controll"}
//@input Asset.AudioTrackAsset playSoundAudioTrack1 { "label": "Audio Track 1"}
//@input Asset.AudioTrackAsset playSoundAudioTrack2 { "label": "Audio Track 2"}
//@input Asset.AudioTrackAsset playSoundAudioTrack3 { "label": "Audio Track 3"}
//@input Asset.AudioTrackAsset playSoundAudioTrack4 { "label": "Audio Track 4"}
//@input Asset.AudioTrackAsset playSoundAudioTrack5 { "label": "Audio Track 5"}
//@input Asset.AudioTrackAsset playSoundAudioTrack6 { "label": "Audio Track 6"}
//@input float playSoundVolume = 1.0 { "widget": "slider", "min": 0.0, "max": 1.0, "showIfValue": "Play", "label": "Volume", "step": 0.05}

//@ui {"widget": "group_end"}

//@ui {"widget": "group_start", "label": "Texture Controll"}
//@input Component.MaterialMeshVisual setTextureTarget {"label": "CakeMaterial"}
//@input Asset.Texture texture_1bite {"label": "TextureBite1"}
//@input Asset.Texture texture_2bite {"label": "TextureBite2"}
//@input Asset.Texture texture_3bite {"label": "TextureBite3"}
//@input Asset.Texture texture_4bite {"label": "TextureBite4"}
//@input Asset.Texture texture_5bite {"label": "TextureBite5"}
//@input Asset.Texture texture_6bite {"label": "TextureBite6"}


//@ui {"widget": "group_end"}



var getDistanceFunc = null;
var isInitialized = false;
var cakeIsEate = false;


if (!global.scBehaviorSystem) {
    global.scBehaviorSystem = {};
    var globalTriggerSystem = (function() {
        var listeners = {};

        function getListeners(key) {
            return setDefault(listeners, key, []);
        }
        return {
            addListener: function(key, callback) {
                getListeners(key).push(callback);
            },
            removeListener: function(key, callback) {
                if (!removeFromArray(getListeners(key), callback)) {
                    debugPrint("Failed to remove listener");
                }
            },
            sendMessage: function(key) {
                getListeners(key).forEach(safeCall);
            },
        };
    })();
    global.scBehaviorSystem.addCustomTriggerResponse = globalTriggerSystem.addListener;
    global.scBehaviorSystem.removeCustomTriggerResponse = globalTriggerSystem.removeListener;
    global.scBehaviorSystem.sendCustomTrigger = globalTriggerSystem.sendMessage;
}
if (!global.behaviorSystem) {
    global.behaviorSystem = global.scBehaviorSystem;
}


function setDefault(obj, key, def) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = def;
        return def;
    }
    return obj[key];
}

function removeFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}

function debugPrint(message) {
    print("[" + script.getSceneObject().name + "] " + message);
}

function safeCall(func) {
    if (func) {
        func();
    }
}


function onLensTurnOn() {
    if (validateInputs()) {
        setInputs();
        isInitialized = true;
    }
}

function setupTrigger(){
   global.scBehaviorSystem.addCustomTriggerResponse(script.onCustomTriggerTriggerName, onTrigger);
}

function onTrigger(){
    triggerPlaySound();
    calculateBites();
    triggerSetTexture();
}

function onUpdate() {
     if (isInitialized) {
        
    }
}

var biteCount = 0;
function calculateBites() {
    if(!cakeIsEate){
        biteCount ++
    };
    if( biteCount >= 6){
        cakeIsEate = true;
    }
    print(biteCount +" bite");
        print(" cakeIsEate"+cakeIsEate);

}

function triggerSetTexture(biteIndex) {
    if (!script.setTextureTarget) {
        debugPrint("Target must be set!");
        return;
    }
    var textures=[];
    textures.push(script.texture_1bite);
    textures.push(script.texture_2bite);
    textures.push(script.texture_3bite);
    textures.push(script.texture_4bite);
    textures.push(script.texture_5bite);
    textures.push(script.texture_6bite);
    script.setTextureTarget.mainPass.baseTex = textures[biteCount] || null;
}

function triggerPlaySound() {
    script.playSoundAudioComponent = script.getSceneObject().createComponent("Component.AudioComponent");
    var audioTracks =[];
        audioTracks.push(script.playSoundAudioTrack1);
        audioTracks.push(script.playSoundAudioTrack2);
        audioTracks.push(script.playSoundAudioTrack3);
        audioTracks.push(script.playSoundAudioTrack4);
        audioTracks.push(script.playSoundAudioTrack5);
        audioTracks.push(script.playSoundAudioTrack6);

      if(!cakeIsEate){
        script.playSoundAudioComponent.audioTrack = audioTracks[biteCount];  
        script.playSoundAudioComponent.play(script.playSoundLoop ? -1 : 1);
    }
          
}

function validateInputs() {
    if (!script.triggerScript) {
        print("FaceLandmarksDistanceResponse, ERROR: Please make sure Distance script exist and assign the script component to this script");
        return false;
    }
    
//    if (!script.triggerScript.api || !script.triggerScript.api.getDistance) {
//        print("FaceLandmarksDistanceResponse, ERROR: Please make sure the Distance script contains the getDistance api");
//        return false;
//    }
//
    return true;
}


function setInputs() {
   // getDistanceFunc = script.distanceScript.api.getDistance;
}


var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(onLensTurnOn);

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

setupTrigger();
