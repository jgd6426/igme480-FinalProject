// https://aframe.io/docs/1.5.0/core/component.html#events
// click event 
AFRAME.registerComponent('clicked', {
    init: function() {
        this.el.addEventListener('click', e => {
            alert(`I'm using the alert as an quick way to demo, but the idea is some sort of text box area would show up with information about this specific person. 
            What happened, who they were, etc.`);
        });
    }
});

// function to create compound entity at given location
const createEntity = (lat, lon, ) => {
    // compound entity of memorial
    const compoundEntity = document.createElement("a-entity");
    compoundEntity.setAttribute('gps-new-entity-place', {
        latitude: lat,
        longitude: lon
    });

    const platform = document.createElement("a-cylinder");
    platform.setAttribute("scale", {
        x: 40, 
        y: 5,
        z: 40
    });
    platform.setAttribute("position", {
        x: 0,
        y: -40,
        z: 0
    });
    platform.setAttribute('material', { color: 'darkGreen' } );
    // platform.setAttribute("look-at", "[gps-new-camera]");
    platform.setAttribute('clicked', { }); 

    const box = document.createElement("a-box");
    box.setAttribute("scale", {
        x: 50, 
        y: 50,
        z: 10
    });
    box.setAttribute("position", {
        x: 0,
        y: -20,
        z: 0
    });
    box.setAttribute('material', { color: 'grey' } );
    box.setAttribute("look-at", "[gps-new-camera]");
    box.setAttribute('clicked', { }); // Add the click component

    const box1 = document.createElement("a-box");
    box1.setAttribute("scale", {
        x: 5, 
        y: 14,
        z: 5
    });
    box1.setAttribute("position", {
        x: 0,
        y: 14,
        z: 0
    });
    box1.setAttribute('material', { color: 'grey' } );
    box1.setAttribute("look-at", "[gps-new-camera]");
    box1.setAttribute('clicked', { }); // Add the click component

    const box2 = document.createElement("a-box");
    box2.setAttribute("scale", {
        x: 14, 
        y: 5,
        z: 5
    });
    box2.setAttribute("position", {
        x: 0,
        y: 14,
        z: 0
    });
    box2.setAttribute('material', { color: 'grey' } );
    box2.setAttribute("look-at", "[gps-new-camera]");
    box2.setAttribute('clicked', { }); // Add the click component

    const text = document.createElement("a-text");
    const textScale = 50;
    text.setAttribute("look-at", "[gps-new-camera]");
    text.setAttribute("scale", {
        x: textScale, 
        y: textScale,
        z: textScale
    });
    text.setAttribute("position",  {
        x: 0,
        y: 30,
        z: 0
    });
    text.setAttribute("value", "First, lastName");
    text.setAttribute("align", "center");

    compoundEntity.appendChild(platform);
    compoundEntity.appendChild(box);
    compoundEntity.appendChild(box1);
    compoundEntity.appendChild(box2);
    compoundEntity.appendChild(text);
    compoundEntity.setAttribute('clicked', { }); 
    document.querySelector("a-scene").appendChild(compoundEntity);
};

// https://ar-js-org.github.io/AR.js-Docs/location-based-aframe/
window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", async (e) => {
        if(!testEntityAdded) {
            alert(`Current GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);

            // hardcoding in some locations to test the functionality
            createEntity(e.detail.position.latitude + 0.001, e.detail.position.longitude);
            createEntity(e.detail.position.latitude + 0.001, e.detail.position.longitude + 0.001);
            createEntity(e.detail.position.latitude, e.detail.position.longitude + 0.001);
            createEntity(e.detail.position.latitude - 0.001, e.detail.position.longitude);
            createEntity(e.detail.position.latitude - 0.001, e.detail.position.longitude - 0.001);
            createEntity(e.detail.position.latitude, e.detail.position.longitude - 0.001);
            createEntity(e.detail.position.latitude + 0.001, e.detail.position.longitude - 0.001);
            createEntity(e.detail.position.latitude - 0.001, e.detail.position.longitude + 0.001);
            
            createEntity(e.detail.position.latitude + 0.002, e.detail.position.longitude+0.004);
            createEntity(e.detail.position.latitude + 0.003, e.detail.position.longitude + 0.002);
            createEntity(e.detail.position.latitude - 0.004, e.detail.position.longitude + 0.002);
            createEntity(e.detail.position.latitude - 0.002, e.detail.position.longitude - 0.003);
            createEntity(e.detail.position.latitude + 0.002, e.detail.position.longitude - 0.002);
            createEntity(e.detail.position.latitude - 0.003, e.detail.position.longitude + 0.003);
        }
        testEntityAdded = true;
    });
}