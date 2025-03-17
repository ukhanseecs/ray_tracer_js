const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height=window.innerHeight;




function make_checkerboard()
{
    const rows = 30;
    const cols = 50;
    const tileSize = canvas.width / cols;
    const colors = ["#D7263D", "#F46036", "#2E294E", "#1B998B","#C5D86D"];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let colorIndex = (row + col) % colors.length; // Cycle through colors
            ctx.fillStyle = colors[colorIndex];
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
    
}


//===========================vec2d class and helper functions ========================================================
 class Vec2d{

    constructor(a,b,c=0){
        this.x=a;
        this.y=b;
        this.z=c;
    }

}

//============================Drawing Functions==========================================================
 function DrawLine(vertexA,vertexB,lineCol='red',lw=5,fillcol='black'){
    ctx.fillStyle=fillcol;
    ctx.strokeStyle=lineCol;
    ctx.lineWidth=lw;
    ctx.beginPath();
    ctx.moveTo(vertexA.x,vertexA.y);
    ctx.lineTo(vertexB.x,vertexB.y);
    ctx.stroke();
}


 function DrawTriangle(vertexA,vertexB,vertexC,lineCol='red',lw=5,fillcol='black'){

    DrawLine(vertexA,vertexB,lineCol,lw,fillcol);
    DrawLine(vertexB,vertexC,lineCol,lw,fillcol);
    DrawLine(vertexC,vertexA,lineCol,lw,fillcol);



}
 function DrawCircle(vertex,r,lineCol='red',lw=5,fillcol='black'){
    ctx.fillStyle=fillcol;
    ctx.strokeStyle=lineCol;
    ctx.lineWidth=lw;
    ctx.beginPath();
    ctx.arc(vertex.x,vertex.y,r,0,2*Math.PI);
    ctx.stroke();

}
//GPT :)
function FillCircle(vertex, r, fillCol = 'black') {
    ctx.fillStyle = fillCol;
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, r, 0, 2 * Math.PI);
    ctx.fill();
}
//GPT :)
function FillQuarteredCircle(vertex, r, colors = ["cyan", "purple", "yellow", "#ff00a2"]) {
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(vertex.x, vertex.y);
        ctx.arc(vertex.x, vertex.y, r, (i * Math.PI) / 2, ((i + 1) * Math.PI) / 2);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length]; // Cycle through provided colors
        ctx.fill();
    }
}
 function DrawPolygon(vertexBuffer,indexBuffer,lineCol='red',lw=5,fillcol='black'){

   
    for (let i=0 ; i<indexBuffer.length;i+=3)
    {
        DrawTriangle(vertexBuffer[indexBuffer[i]] , vertexBuffer[indexBuffer[i+1]],vertexBuffer[indexBuffer[i+2]],lineCol,lw,fillcol );
    }
}
 function DrawPolygon2(position,angle,vertexBuffer,indexBuffer,lineCol='red',lw=5,fillcol='black'){

    let transformedVertices=[];
    for(let i=0;i<vertexBuffer.length;i++)
    {
         transformedVertices.push (new Vec2d( (vertexBuffer[i].x * Math.cos(angle) - vertexBuffer[i].y * Math.sin(angle) ) + position.x , (vertexBuffer[i].x * Math.sin(angle) + vertexBuffer[i].y * Math.cos(angle) ) + position.y ) );
        
    }

    for (let i=0 ; i<indexBuffer.length;i+=3)
    {
        DrawTriangle(transformedVertices[indexBuffer[i]] , transformedVertices[indexBuffer[i+1]],transformedVertices[indexBuffer[i+2]],lineCol,lw,fillcol );
    }
}

function DrawPolygon3(vertices ,lineCol='red',lw=5,fillcol='black' ){

    for(let i =0 ; i < vertices.length;i++){
        DrawLine(vertices[i],vertices[(i+1)%vertices.length],lineCol,lw,fillcol);
    }

}


function FindCentroid(vertices){
    let xc=0; let yc=0;
    for(let i=0;i<vertices.length;i++){
        xc += vertices[i].x;
        yc += vertices[i].y;
    }
    xc = xc/vertices.length;    
    yc = yc/vertices.length;
    return new Vec2d(xc,yc);
}

function FillCentroid(vertices){
    let xc=0; let yc=0;
    for(let i=0;i<vertices.length;i++){
        xc += vertices[i].x;
        yc += vertices[i].y;
    }
    xc = xc/vertices.length;    
    yc = yc/vertices.length;
    if (vertices.length > 1){
        FillCircle(new Vec2d(xc,yc),5,'blue');
    }

}

class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize_vec3d() {
        const mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector3D(this.x / mag, this.y / mag, this.z / mag)
    }

    unit_vec3d() {
        const mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new Vector3D(this.x / mag, this.y / mag, this.z / mag)
    }

    static dot_vec3d(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static subtract_vec3d(a, b) {
        return new Vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    static add_vec3d(a, b) {
        return new Vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    static multiply_vec3d(a, b) {
        return new Vector3D(a.x * b, a.y * b, a.z * b);
    }

    static scalar_multiply_vec3d(a, b) { 
        return new Vector3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }

}



