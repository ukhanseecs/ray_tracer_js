let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

// Change these values
let viewport_width = 2; // reduced from 800
let aspect_ratio = 16/9;
let viewport_height = viewport_width / aspect_ratio;
let focal_length = 1;

let camera_pos = new Vector3D(0, 0, 0);
let light_pos = new Vector3D(5,5,5);

const canvas_width = canvas.width;
const canvas_height = canvas.height;

// Add this after canvas dimensions are set
console.log('Canvas dimensions:', canvas_width, canvas_height);

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

// Modify sphere parameters
let sphere_center = new Vector3D(0, 0, -2); // moved from -5 to -2
let sphere_radius = 1; // reduced from 4 to 1
let sphere_color = new Vector3D(255, 0, 0); // keep red color

let ray_origin = new Vector3D(0, 0, 0);
let t = 2;


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
    // Change this line - don't use scalar_multiply_vec3d for colors
    let finalColor = new Vector3D(
        sphere.color.x * lightIntensity,
        sphere.color.y * lightIntensity,
        sphere.color.z * lightIntensity
    );

    return `rgb(${Math.floor(finalColor.x)}, ${Math.floor(finalColor.y)}, ${Math.floor(finalColor.z)})`;
}


function Loop(){
    let sphere = new Sphere(sphere_center, sphere_radius, sphere_color);
    let hitCount = 0;
    
    for (let i=0; i < canvas_width; i++){
        for (let j=0; j < canvas_height; j++){
            let ray = compute_ray(i, j);
            let t = find_intersection(ray, sphere);
            if (t > 0){
                hitCount++;
                let hitpoint = find_hitpoint(ray, t);
                let normal = find_normal(hitpoint, sphere_center);
                let color = computeLighting(hitpoint, light_pos, normal, sphere, ray);
                ctx.fillStyle = color;
                ctx.fillRect(i, j, 1, 1);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    console.log('Ray hits:', hitCount);
}
    
Loop();
