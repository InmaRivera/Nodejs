// El servidor se mostrará en la dirección 127.0.0.3:8083. Si accedemos a esta dirección, debe mostrarnos un mensaje de bienvenida. Si accedemos a otra dirección que no sea /dni ni /escribir, debe mostrar un aviso.
// Cuando se escriba la dirección URL 127.0.0.3:8083/dni, carga la página web HTML estática alojada en el servidor llamada instrucciones.html (adjunta).
// Cuando se escriba la dirección URL anterior con el parámetro num (por ejemplo, 127.0.0.3:8083/dni?num=12345678), escribe por pantalla el DNI completo, calculando la letra que corresponda.
// Cuando se escriba la dirección URL 127.0.0.3:8083/escribir se creará en el servidor una carpeta llamada Copia y dentro de ésta un archivo de texto llamado holaMundo.txt, cuyo contenido será tu nombre completo.

//Importamos el modulo http
var http = require('http');
var fs = require('fs');
//Definimos variable la url
var url = require('url');

http.createServer(function (peticion, respuesta) {
    //variable base
    var base = url.parse(peticion.url, true);
    //Definimos la variable params
    var params = base.query;
    //Cuando accedemos mostramos mensaje de bienvenida:
    if (base.pathname == '/') {
        respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        respuesta.write('Bienvenido/a a la práctica de Nodejs');
        respuesta.end();
    }

    //Creamos los parámetros para poder calcular la letra
    //para buscar dni indicamos la ruta
    else if (base.pathname == '/dni') {
        if (params.num > 0) {
            let letra = dni(params.num);
            respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
            respuesta.write(`La letra de tu DNI completo es: ${params.num} ${letra}`);
            respuesta.end();
        } else {
            // Mostramos el html que muestra por pantalla
            fs.readFile('instrucciones.html', function (err, dato) {
                if (err) {
                    console.log('Error al acceder a dni');
                }
                respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                respuesta.write(dato);
                respuesta.end();

            });
        }
    }
    //Crear una carpeta copia y dentro un fichero de texto llamado holaMundo.txt
    else if (base.pathname == '/escribir') {
        // Creamos primero la carpeta llamada copia
        fs.mkdir('copia', function (err) {
            if (err) {
                //Indicamos si hay un error al crear la carpeta, por que ya existe
                respuesta.write('Error al crear la carpeta, ya existe.');
                console.log('error al crear la carpeta');

            }
            // Indicamos que hemos creado la carpeta
            console.log('Carpeta creada');
            respuesta.write('Carpeta creada!.');

            //Crear el archivo con nuestro nombre completo en el contenido
            //En contenido guardamos el nombre completo y lo añadimos al fichero
            var contenido = "\rInmaculada Rivera Pablo. ";
            //indicamos que cree el fichero holaMundo y lo guarde en la carpeta copia creada andateriormente
            fs.appendFile('copia/holaMundo.txt', contenido, function (err) {
                if (err) {
                    //Avisamos de error si no se crea la carpeta
                    console.log('Error al crear el fichero');
                    throw err;

                }
                //Si creamos Fichero lo indicamos:
                console.log('Fichero creado!!');
                respuesta.write('Fichero creado!!');
                respuesta.end();
            })

        })
    }
    //Si no escribimos /dni o /esribimos mostramos el aviso
    else {
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        respuesta.write('AVISO: debe escribir /dni o /escribir.');
        respuesta.end();
    }
    //Indicamos el puerto y el host 
}).listen(8083, "127.0.0.3");
console.log('Working at: http://127.0.0.3:8083/');

//Creamos función para calcular dni
function dni(numero) {
    let letra;
    let resto = (numero % 23);

    switch (resto) {
        case 0:
            letra = "T";
            break;
        case 1:
            letra = "R";
            break;
        case 2:
            letra = "W";
            break;
        case 3:
            letra = "A";
            break;
        case 4:
            letra = "G";
            break;
        case 5:
            letra = "M";
            break;
        case 6:
            letra = "Y";
            break;
        case 7:
            letra = "F";
            break;
        case 8:
            letra = "P";
            break;
        case 9:
            letra = "D";
            break;
        case 10:
            letra = "X";
            break;
        case 11:
            letra = "B";
            break;
        case 12:
            letra = "N";
            break;
        case 13:
            letra = "J";
            break;
        case 14:
            letra = "Z";
            break;
        case 15:
            letra = "S";
            break;
        case 16:
            letra = "Q";
            break;
        case 17:
            letra = "V";
            break;
        case 18:
            letra = "H";
            break;
        case 19:
            letra = "L";
            break;
        case 20:
            letra = "C";
            break;
        case 21:
            letra = "K";
            break;
        case 22:
            letra = "E";
            break;

        default:
            break;
    }

    return letra;
}




