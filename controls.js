// Controls for ray tracer UI

function initControls(loopFunction, lightPosRef, sphereCenterRef, sphereRadiusRef, sphereColorRef, bgColorRef) {
    // Light position controls
    const lightX = document.getElementById('lightX');
    const lightY = document.getElementById('lightY');
    const lightZ = document.getElementById('lightZ');
    
    lightX.addEventListener('input', () => {
        lightPosRef.x = parseFloat(lightX.value);
        document.getElementById('lightXValue').textContent = lightX.value;
        loopFunction(); // Auto-render on change
    });
    
    lightY.addEventListener('input', () => {
        lightPosRef.y = parseFloat(lightY.value);
        document.getElementById('lightYValue').textContent = lightY.value;
        loopFunction(); // Auto-render on change
    });
    
    lightZ.addEventListener('input', () => {
        lightPosRef.z = parseFloat(lightZ.value);
        document.getElementById('lightZValue').textContent = lightZ.value;
        loopFunction(); // Auto-render on change
    });
    
    // Sphere position controls
    const sphereX = document.getElementById('sphereX');
    const sphereY = document.getElementById('sphereY');
    const sphereZ = document.getElementById('sphereZ');
    
    sphereX.addEventListener('input', () => {
        sphereCenterRef.x = parseFloat(sphereX.value);
        document.getElementById('sphereXValue').textContent = sphereX.value;
        loopFunction(); // Auto-render on change
    });
    
    sphereY.addEventListener('input', () => {
        sphereCenterRef.y = parseFloat(sphereY.value);
        document.getElementById('sphereYValue').textContent = sphereY.value;
        loopFunction(); // Auto-render on change
    });
    
    sphereZ.addEventListener('input', () => {
        sphereCenterRef.z = parseFloat(sphereZ.value);
        document.getElementById('sphereZValue').textContent = sphereZ.value;
        loopFunction(); // Auto-render on change
    });
    
    // Sphere radius control
    const sphereRadius = document.getElementById('sphereRadius');
    sphereRadius.addEventListener('input', () => {
        sphereRadiusRef.value = parseFloat(sphereRadius.value);
        document.getElementById('sphereRadiusValue').textContent = sphereRadius.value;
        loopFunction(); // Auto-render on change
    });
    
    // Sphere color controls
    const sphereRed = document.getElementById('sphereRed');
    const sphereGreen = document.getElementById('sphereGreen');
    const sphereBlue = document.getElementById('sphereBlue');
    
    sphereRed.addEventListener('input', () => {
        sphereColorRef.x = parseInt(sphereRed.value);
        document.getElementById('sphereRedValue').textContent = sphereRed.value;
        loopFunction(); // Auto-render on change
    });
    
    sphereGreen.addEventListener('input', () => {
        sphereColorRef.y = parseInt(sphereGreen.value);
        document.getElementById('sphereGreenValue').textContent = sphereGreen.value;
        loopFunction(); // Auto-render on change
    });
    
    sphereBlue.addEventListener('input', () => {
        sphereColorRef.z = parseInt(sphereBlue.value);
        document.getElementById('sphereBlueValue').textContent = sphereBlue.value;
        loopFunction(); // Auto-render on change
    });
    
    // Background color controls
    const bgRed = document.getElementById('bgRed');
    const bgGreen = document.getElementById('bgGreen');
    const bgBlue = document.getElementById('bgBlue');
    
    bgRed.addEventListener('input', () => {
        bgColorRef.r = parseInt(bgRed.value);
        document.getElementById('bgRedValue').textContent = bgRed.value;
        loopFunction(); // Auto-render on change
    });
    
    bgGreen.addEventListener('input', () => {
        bgColorRef.g = parseInt(bgGreen.value);
        document.getElementById('bgGreenValue').textContent = bgGreen.value;
        loopFunction(); // Auto-render on change
    });
    
    bgBlue.addEventListener('input', () => {
        bgColorRef.b = parseInt(bgBlue.value);
        document.getElementById('bgBlueValue').textContent = bgBlue.value;
        loopFunction(); // Auto-render on change
    });
    
    // --- Mouse wheel for sphere radius and z position (canvas only, robust update) ---
    const canvas = document.getElementById('canvas1');
    if (canvas) {
        canvas.addEventListener('wheel', function(e) {
            if (!sphereRadius || !sphereZ) return;
            if (e.shiftKey) {
                // Adjust z position
                let dz = (e.deltaY < 0 ? 1 : -1) * 0.1;
                let newZ = parseFloat(sphereZ.value) + dz;
                newZ = Math.max(parseFloat(sphereZ.min), Math.min(parseFloat(sphereZ.max), newZ));
                newZ = +newZ.toFixed(2);
                sphereZ.value = newZ;
                document.getElementById('sphereZText').value = newZ;
                document.getElementById('sphereZValue').textContent = newZ;
                sphereCenterRef.z = newZ;
            } else {
                // Adjust radius
                let dr = (e.deltaY < 0 ? 1 : -1) * 0.05;
                let newR = parseFloat(sphereRadius.value) + dr;
                newR = Math.max(parseFloat(sphereRadius.min), Math.min(parseFloat(sphereRadius.max), newR));
                newR = +newR.toFixed(3);
                sphereRadius.value = newR;
                document.getElementById('sphereRadiusText').value = newR;
                document.getElementById('sphereRadiusValue').textContent = newR;
                sphereRadiusRef.value = newR;
            }
            loopFunction();
            e.preventDefault();
        }, { passive: false });
    }
}
