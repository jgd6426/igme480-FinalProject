// https://aframe.io/docs/1.5.0/core/component.html#events
AFRAME.registerComponent('clicked', {
    init: function() {
        this.el.addEventListener('click', e => {
            alert(`Box clicked!`);
        });
    }
});

// https://ar-js-org.github.io/AR.js-Docs/location-based-aframe/
window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", async (e) => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const entity = document.createElement("a-box");
            entity.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity.setAttribute('material', { color: 'red' } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            entity.setAttribute('clicker', { }); // Add the clicker component
            entity.addEventListener('click', function (evt) {
                alert('Clicked!');
            });
            document.querySelector("a-scene").appendChild(entity);

            // Add a sphere to the east of the initial GPS position
            const entity2 = document.createElement("a-sphere");
            entity2.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity2.setAttribute('material', { color: 'yellow' } );
            entity2.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude,
                longitude: e.detail.position.longitude + 0.001
            });
            entity2.setAttribute('clicker', { }); 
            document.querySelector("a-scene").appendChild(entity2);

            // Add a cylinder to the south of the initial GPS position
            const entity3 = document.createElement("a-cylinder");
            entity3.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity3.setAttribute('material', { color: 'orange' } );
            entity3.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude - 0.001,
                longitude: e.detail.position.longitude
            });
            entity3.setAttribute('clicker', { }); 
            document.querySelector("a-scene").appendChild(entity3);

            // Add a cone to the west of the initial GPS position
            const entity4 = document.createElement("a-cone");
            entity4.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity4.setAttribute('material', { color: 'magenta' } );
            entity4.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude,
                longitude: e.detail.position.longitude - 0.001
            });
            entity4.setAttribute('clicker', { }); 
            document.querySelector("a-scene").appendChild(entity4);

            const compoundEntity = document.createElement("a-entity");
            compoundEntity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude + 0.001
            });
            const box = document.createElement("a-box");
            box.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            box.setAttribute('material', { color: 'blue' } );
            box.setAttribute("position",  {
                x: 0,
                y: 20,
                z: 0
            });
            const text = document.createElement("a-text");
            const textScale = 100;
            text.setAttribute("look-at", "[gps-new-camera]");
            text.setAttribute("scale", {
                x: textScale, 
                y: textScale,
                z: textScale
            });
            text.setAttribute("value", "Hello World");
            text.setAttribute("align", "center");

            compoundEntity.appendChild(box);
            compoundEntity.appendChild(text);
            compoundEntity.setAttribute('clicker', { }); 
            document.querySelector("a-scene").appendChild(compoundEntity);
        }
        testEntityAdded = true;
    });

    // `click` event emitted by browser on mouse click.
    document.querySelector('a-box').addEventListener('click', function (evt) {
        console.log('This element was clicked!');
    });
}