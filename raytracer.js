let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

let viewport_width = 2; 
let aspect_ratio = 16/9;
let viewport_height = viewport_width / aspect_ratio;
let focal_length = 1;

let camera_pos = new Vector3D(0, 0, 0);
let light_pos = new Vector3D(5,-2,4);

const canvas_width = canvas.width;
const canvas_height = canvas.height;


class Sphere{
    constructor(center, radius, color){
        this.center = center;
        this.radius = radius;
        this.color = color;
    }
}

class Ray{
    constructor(origin, direction, t){
        this.origin = origin;
        this.direction = direction;
        this.t = t;
    }
}

let sphere_center = new Vector3D(-0.1, 0, -0.5); 
let sphere_radius = 0.2; 
let sphere_color = new Vector3D(255, 0, 0); 

let bg_color = {r: 0, g: 0, b: 0}; 

let ray_origin = new Vector3D(0, 0, 0);
let t = 2;

const sphereRadiusRef = { value: sphere_radius };

function compute_ray(i, j){
    let x = (2* i/canvas_width) -1;
    let y = 1 -(2*j/canvas_height);

    x = x * viewport_width / 2;
    y = y * viewport_height / 2;


    let ray_direction = new Vector3D(x,y, -focal_length)
    ray_direction = ray_direction.normalize_vec3d();

    return new Ray(ray_origin, ray_direction, null);
}


function find_intersection(ray, sphere){
    let a = Vector3D.dot_vec3d(ray.direction, ray.direction);
    let b = 2 * Vector3D.dot_vec3d(ray.direction, Vector3D.subtract_vec3d(ray.origin, sphere.center));
    let c = Vector3D.dot_vec3d(Vector3D.subtract_vec3d(ray.origin, sphere.center), Vector3D.subtract_vec3d(ray.origin, sphere.center)) - sphere.radius * sphere.radius;


    let discriminant = b*b - 4*a*c;

    if (discriminant < 0) {
        return -1;
    } 

    let t1 = (-b + Math.sqrt(discriminant)) / (2*a);
    let t2 = (-b - Math.sqrt(discriminant)) / (2*a);

    if (t1 > 0)
        return t1;
    if (t2 > 0)
        return t2;
    
    return -1;
}



function find_hitpoint(ray, t){
    if (t > 0){
        let P = Vector3D.add_vec3d(ray.origin, Vector3D.multiply_vec3d(ray.direction, t));
        return P;
    }
    return null
}

function find_normal(P, sphere_center){
    let normal_vector = Vector3D.subtract_vec3d(P, sphere_center);
    normal_vector = normal_vector.unit_vec3d();
    return normal_vector;
}



function computeLighting(hitpoint, lightPos, normal, sphere, ray){
    let lightDir = Vector3D.subtract_vec3d(lightPos, hitpoint);
    lightDir = lightDir.unit_vec3d();
    let lightIntensity = Vector3D.dot_vec3d(lightDir, normal);
    lightIntensity = Math.max(0, lightIntensity);
    let finalColor = new Vector3D(
        sphere.color.x * lightIntensity,
        sphere.color.y * lightIntensity,
        sphere.color.z * lightIntensity
    );

    return `rgb(${Math.floor(finalColor.x)}, ${Math.floor(finalColor.y)}, ${Math.floor(finalColor.z)})`;
}


function Loop(){
    sphere_radius = sphereRadiusRef.value;
    let sphere = new Sphere(sphere_center, sphere_radius, sphere_color);
    
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    
    for (let i=0; i < canvas_width; i++){
        for (let j=0; j < canvas_height; j++){
            let ray = compute_ray(i, j);
            let t = find_intersection(ray, sphere);
            if (t > 0){
                let hitpoint = find_hitpoint(ray, t);
                let normal = find_normal(hitpoint, sphere_center);
                let color = computeLighting(hitpoint, light_pos, normal, sphere, ray);
                ctx.fillStyle = color;
                ctx.fillRect(i, j, 1, 1);
            } else {
                ctx.fillStyle = `rgb(${bg_color.r}, ${bg_color.g}, ${bg_color.b})`;
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}


// --- dat.GUI UI integration ---
window.addEventListener('load', () => {
    // dat.GUI setup
    const gui = new dat.GUI();

    // Light position folder
    const lightFolder = gui.addFolder('Light Position');
    lightFolder.add(light_pos, 'x', -10, 10, 0.1).name('X').onChange(Loop);
    lightFolder.add(light_pos, 'y', -10, 10, 0.1).name('Y').onChange(Loop);
    lightFolder.add(light_pos, 'z', -10, 10, 0.1).name('Z').onChange(Loop);
    lightFolder.open();

    // Sphere properties folder
    const sphereFolder = gui.addFolder('Sphere Properties');
    sphereFolder.add(sphere_center, 'x', -10, 10, 0.1).name('X').onChange(Loop);
    sphereFolder.add(sphere_center, 'y', -10, 10, 0.1).name('Y').onChange(Loop);
    sphereFolder.add(sphere_center, 'z', -10, 10, 0.1).name('Z').onChange(Loop);
    sphereFolder.add(sphereRadiusRef, 'value', 0.1, 5, 0.05).name('Radius').onChange(Loop);
    sphereFolder.open();

    // Sphere color folder
    const sphereColorFolder = gui.addFolder('Sphere Color');
    sphereColorFolder.add(sphere_color, 'x', 0, 255, 1).name('Red').onChange(Loop);
    sphereColorFolder.add(sphere_color, 'y', 0, 255, 1).name('Green').onChange(Loop);
    sphereColorFolder.add(sphere_color, 'z', 0, 255, 1).name('Blue').onChange(Loop);
    sphereColorFolder.open();

    // Background color folder
    const bgColorFolder = gui.addFolder('Background Color');
    bgColorFolder.add(bg_color, 'r', 0, 255, 1).name('Red').onChange(Loop);
    bgColorFolder.add(bg_color, 'g', 0, 255, 1).name('Green').onChange(Loop);
    bgColorFolder.add(bg_color, 'b', 0, 255, 1).name('Blue').onChange(Loop);
    bgColorFolder.open();

    // Initial render
    Loop();

    // Mouse wheel event for sphere radius and z position
    window.addEventListener('wheel', function(e) {
        // If Shift is held, adjust z position; otherwise, adjust radius
        if (e.shiftKey) {
            // Move sphere along z-axis (in/out)
            let dz = (e.deltaY < 0 ? 1 : -1) * 0.1;
            sphere_center.z += dz;
            // Clamp z value to GUI range
            sphere_center.z = Math.max(-10, Math.min(10, sphere_center.z));
            // If dat.GUI is present, update display
            if (gui.__folders && gui.__folders['Sphere Properties']) {
                let zController = gui.__folders['Sphere Properties'].__controllers[2];
                zController.setValue(sphere_center.z);
            }
        } else {
            // Adjust sphere radius
            let dr = (e.deltaY < 0 ? 1 : -1) * 0.05;
            sphereRadiusRef.value += dr;
            // Clamp radius to GUI range
            sphereRadiusRef.value = Math.max(0.1, Math.min(5, sphereRadiusRef.value));
            // If dat.GUI is present, update display
            if (gui.__folders && gui.__folders['Sphere Properties']) {
                let rController = gui.__folders['Sphere Properties'].__controllers[3];
                rController.setValue(sphereRadiusRef.value);
            }
        }
        Loop();
        e.preventDefault();
    }, { passive: false });
});
