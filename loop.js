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

function Loop(){

    for (let i=0; i < canvas_width; i++){
        for (let j=0; j< canvas.height; j++){
            let x = (2* i/canvas_width) -1;
            let y = 1 -(2*j/canvas_height);

            x = x * viewport_width / 2;
            y = y * viewport_height / 2;

            let pixel = new Vec2d(x, y);

            let ray_direction = new Vector3D(pixel, -focal_length)
            ray_direction = ray_direction.normalize_vec3d();
    
        }
    }
    //=======================================================================================     
}  
    
    Loop();
    