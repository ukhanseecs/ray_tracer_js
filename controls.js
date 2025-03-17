// Controls for ray tracer UI

function initControls(loopFunction, lightPosRef, sphereCenterRef, sphereRadiusRef) {
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
    
}
