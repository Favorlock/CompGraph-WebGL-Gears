//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function createGear() {
    const vertices = [];
    const colors = [];
    const normals = [];


////////////////////////////
// Making gear triangles

    var n = 40;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2 * 3.14159 / n;
    var ang = 0;
    var z = 0.1;

    var i;       //  coin face, front
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, z,
            rad * Math.cos(ang), rad * Math.sin(ang), z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);

        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        ang += angInc;
    }


    ang = 0;   // coin face, back
    for (i = 0; i < n; i++) {

        vertices.push(0, 0, -z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z)

        colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157);

        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        ang += angInc;
    }

    var r;
    for (r = 0; r < 2; r++) {
        ang = 0;
        var drawTooth = false;

        for (i = 0; i < n; i++) {       // face of the teeth
            drawTooth = !drawTooth;
            if (drawTooth) {

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z)

                colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)

                if (z > 0) {
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                } else {
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                }

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z);


                colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)

                if (z > 0) {
                    normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);
                } else {
                    normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);
                }
            }
            ang += angInc;
        }
        z = -z;
    }

    z = -z;


    ang = 0;
    var drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        var norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }


    ang = 0;
    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            var norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z)

            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    ang = 0;

    let vector = new Learn_webgl_vector3();

    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            let v1 = vector.create(rad * Math.cos(ang), rad * Math.sin(ang), -z);
            let v2 = vector.create(outRad * Math.cos(ang), outRad * Math.sin(ang), -z);
            let v3 = vector.create(outRad * Math.cos(ang), outRad * Math.sin(ang), z);
            let u = vector.create(); vector.subtract(u, v2, v1);
            let v = vector.create(); vector.subtract(v, v3, v1);
            let norm = vector.create(); vector.crossProduct(norm, u, v); vector.normalize(norm);

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])
            console.log(`${norm[0]} ${norm[1]} ${norm[2]}`)

            v1 = vector.create(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);
            v2 = vector.create(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z);
            v3 = vector.create(outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z);
            u = vector.create(); vector.subtract(u, v2, v1);
            v = vector.create(); vector.subtract(v, v3, v1);
            norm = vector.create(); vector.crossProduct(norm, u, v); vector.normalize(norm);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)
            colors.push(0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157, 0.8314, 0.6863, 0.2157)
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
            console.log(`${norm[0]} ${norm[1]} ${norm[2]}`)

        }
        ang += angInc;
    }


    return [vertices, colors, normals]
}