main();


function main() {

    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl', {antialias: true});

    // If we don't have a GL context, give up now
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }


    var angle_x = 0;
    var angle_y = 0;


    // Vertex shader program, runs on GPU, once per vertex

    const vsSource = `
    precision mediump int;
    precision mediump float;

    attribute vec3 a_vertex;
    attribute vec3 a_color;
    attribute vec3 a_normal;
  
    uniform mat4 u_transform;
    uniform mat4 u_normalMatrix;
  
    varying vec4 v_color;
    varying vec3 v_lighting;

    void main() {
      gl_Position = u_transform * vec4(a_vertex, 1.0);
      
      v_color = vec4(a_color, 1.0);
      
      vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      vec3 directionalLightColor = vec3(1, 1, 1);
      vec3 directionalVector = normalize(vec3(0.0, 0.0, 1));
      
      vec4 transformedNormal = u_normalMatrix * vec4(a_normal, 1.0);
      
      float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      v_lighting = ambientLight + (directionalLightColor * directional);
    }
  `;

    // Fragment shader program, runs on GPU, once per potential pixel

    const fsSource = `
    precision mediump int;
    precision mediump float;

    varying vec4 v_color;
    varying vec3 v_lighting;
    
    void main() {
      gl_FragColor = vec4(v_color.rgb * v_lighting, v_color.a);
    }
  `;

    // Initialize a shader program; this is where all
    // the lighting for the objects, if any, is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Tell WebGL to use our program when drawing
    gl.useProgram(shaderProgram);

    // Collect all the info needed to use the shader program.
    // Look up locations of attributes and uniforms used by
    // our shader program
    const programInfo = {
        program: shaderProgram,
        locations: {
            a_vertex: gl.getAttribLocation(shaderProgram, 'a_vertex'),
            a_color: gl.getAttribLocation(shaderProgram, 'a_color'),
            a_normal: gl.getAttribLocation(shaderProgram, 'a_normal'),
            u_transform: gl.getUniformLocation(shaderProgram, 'u_transform'),
            u_normalMatrix: gl.getUniformLocation(shaderProgram, 'u_normalMatrix'),
        },
    };

    // add an event handler so we can interactively rotate the model
    document.addEventListener('keydown',

        function key_event(event) {

            if (event.keyCode == 37) {   //left
                angle_y -= 3;
            } else if (event.keyCode == 38) {  //top
                angle_x -= 3;
            } else if (event.keyCode == 39) {  //right
                angle_y += 3;
            } else if (event.keyCode == 40) {  //bottom
                angle_x += 3;
            }

            drawScene(gl, programInfo, buffers, angle_x, angle_y);
            return false;
        })


    // build the object(s) we'll be drawing, put the data in buffers
    const buffers = initBuffers(gl, programInfo);

    enableAttributes(gl, buffers, programInfo)

    // Draw the scene
    drawScene(gl, programInfo, buffers, angle_x, angle_y);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl, programInfo) {

    const gearData = createGear();
    const vertices = gearData[0];
    const colors = gearData[1];
    const normals = gearData[2];

    // Create  buffers for the object's vertex positions
    const vertexBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Now pass the list of vertices to the GPU to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW);


    // do likewise for colors
    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(colors),
        gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(normals),
        gl.STATIC_DRAW);

    return {
        // each vertex in buffer has 3 floats
        num_vertices: vertices.length / 3,
        vertex: vertexBuffer,
        color: colorBuffer,
        normal: normalBuffer
    };

}


function enableAttributes(gl, buffers, programInfo) {

    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    // Tell WebGL how to pull vertex positions from the vertex
    // buffer. These positions will be fed into the shader program's
    // "a_vertex" attribute.

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.locations.a_vertex,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_vertex);


    // likewise connect the colors buffer to the "a_color" attribute
    // in the shader program
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.locations.a_color,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.locations.a_color);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.locations.a_normal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.locations.a_normal);

}


//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, angle_x, angle_y) {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Clear to white, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //make transform to implement interactive rotation

    var matrix = new Learn_webgl_matrix();

    var rotate_x_matrix = matrix.create();
    var rotate_y_matrix = matrix.create();
    var transform = matrix.create();
    var scale = matrix.create();

    matrix.scale(scale, 0.8, 0.8, 0.8);

    matrix.rotate(rotate_x_matrix, angle_x, 1, 0, 0);
    matrix.rotate(rotate_y_matrix, angle_y, 0, 1, 0);

    // Combine the two rotations into a single transformation
    matrix.multiplySeries(transform,
        rotate_x_matrix, rotate_y_matrix, scale);

    var normalMatrix = matrix.create();

    matrix.inverse(normalMatrix, transform);
    matrix.transpose(normalMatrix)

    // Set the shader program's uniform
    gl.uniformMatrix4fv(programInfo.locations.u_transform,
        false, transform);
    gl.uniformMatrix4fv(programInfo.locations.u_normalMatrix, false, normalMatrix)

    { // now tell the shader (GPU program) to draw some triangles
        const offset = 0;
        gl.drawArrays(gl.TRIANGLES, offset, buffers.num_vertices);
    }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
// BOILERPLATE CODE, COPY AND PASTE
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.  BOILERPLATE CODE, COPY AND PASTE
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}