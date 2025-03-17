let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

let viewport_width = 800;
let aspect_ratio = 16/9;
let viewport_height = viewport_width / aspect_ratio;
let focal_length = 1;

let camera_pos = new Vector3D(0, 0, 0);

const canvas_width = canvas.width;
const canvas_height = canvas.height;

class Sphere{
    constructor(center, radius){
        this.center = center;
        this.radius = radius;
    }
}

class Ray{
    constructor(origin, direction, t){
        this.origin = origin;
        this.direction = direction;
        this.t = t;
    }
}

let sphere_center = new Vector3D(0, 0, -1);
let sphere_radius = 0.5;

let ray_origin = new Vector3D(0, 0, 0);
let ray_direction = new Vector3D(0, 0, -1);
ray_direction = ray_direction.unit_vec3d()
let t = 2;

function find_intersection(ray, sphere){
    let a = dot(ray.direction, ray.direction);
    let b = 2 * dot(ray_direction, subtract_vec3d(ray.origin, sphere.center));
    let c = dot(subtract_vec3d(ray.origin, sphere.center), subtract_vec3d(ray.origin, sphere.center)) - sphere.radius * sphere.radius;


    let discriminant = b*b - 4*a*c;

    if (discriminant < 0) {
        return -1;
    } 
    else if (discriminant == 0){
        t = -b / (2*a);
        return t;
    }
    else if (discriminant > 0){
        let t1 = (-b + Math.sqrt(discriminant)) / (2*a);
        let t2 = (-b - Math.sqrt(discriminant)) / (2*a);
        if (t1 < 0 && t2 < 0){
            return -1;
        }
        else if (t1<0 && t2>0){
            return t2;
        }
        else if (t1>0 && t2<0){
            return t1;
        }
        else if (t1>0 && t2>0){
            return Math.min(t1, t2);
        }
    }
}

function compute_ray(){
    for (let i=0; i < canvas_width; i++){
        for (let j=0; j< canvas.height; j++){
            let x = (2* i/canvas_width) -1;
            let y = 1 -(2*j/canvas_height);

            x = x * viewport_width / 2;
            y = y * viewport_height / 2;

            let pixel = new Vec2d(x, y);

            let ray_direction = new Vector3D(pixel, -focal_length)
            ray_direction = ray_direction.normalize_vec3d();

            return new Ray(camera_pos, ray_direction, t);
        }
    }
}

function find_normal(ray, sphere){
    let P = new Vector3D(0,0,0)
    let distance = find_intersection(ray, sphere);
    if (distance > 0){
        P = add_vec3d(ray.origin, multiply_vec3d(ray.direction, distance));
    }
    else {
        P = new Vector3D(0,0,0);
    }
    
    let normal_vector = new Vector3D(0,0,0)
    normal_vector = subtract_vec3d(P, sphere_center);
    normal_vector = normal_vector.unit_vec3d();
    return normal_vector;
}



function Loop(){


    //=======================================================================================     
}  
    
    Loop();
    