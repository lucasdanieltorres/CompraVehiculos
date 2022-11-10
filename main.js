// let costosPatentamiento=0;
// let precioInscripcion=0;
let precioTotal=0;
let pagoMensual=0;

/* Los datos correspondientes a los vehiculos fueron cargados en un array de objetos.*/
const vehiculos = [
    { id: 1,marca: "AUDI",modelo: "A1", anio: 2020, kilometraje: 50000, precio: 3500000},
    { id: 2,marca: "AUDI",modelo: "Q5", anio: 2013, kilometraje: 92000, precio: 6000000},
    { id: 3,marca: "ALFA ROMEO",modelo: "MITO", anio: 2014, kilometraje: 110000, precio: 2900000},
    { id: 4,marca: "FORD",modelo: "FOCUS", anio: 2022, kilometraje: 0, precio: 4000000},
    { id: 5,marca: "FORD",modelo: "MAVERICK", anio: 2022, kilometraje: 0, precio: 6900000}
];

comprarVehiculo();
const vehiculo = seleccionarVehiculo();
let confimarOperacion = confirmarCompra();
let cotizar = confirm("¿Desea cotizar un seguro para su vehiculo?");
if(cotizar) {
    let precioSeguro = cotizarSeguro(vehiculo.precio);
    if (precioSeguro!=0){
        console.log("Valor seguro contra todo riesgo para "+vehiculo.marca+" "+vehiculo.modelo+": "+ precioSeguro);
    }
}

// APLICAMOS EL IVA AL VALOR DE LA UNIDAD
const aplicarIva = (precio) => {return precio*1.21};
precioTotal = aplicarIva(vehiculo.precio);

let financiar = confirm("¿Desea estimar la financiacion para la unidad seleccionada?");
if (financiar) {
}




function comprarVehiculo() {
    alert("Bienvenido, presione ACEPTAR para ver el listado de vehiculos");
    listarVehiculos();
}


// listarVehiculos recorre cada objeto del array y lo imprime, dejando ver el listado completo de vehiculos.
function listarVehiculos() {
    vehiculos.forEach((vehiculo) => {
        console.log("ID: "+vehiculo.id,"VEHICULO: "+vehiculo.marca,vehiculo.modelo,"PRECIO: "+ vehiculo.precio,"AÑO "+vehiculo.anio,"KM: "+ vehiculo.kilometraje);
    });
}  


/* la funcion de seleccionarVehiculo trabaja con el ID de cada unidad, y retorna el objeto correspondiente al vehiculo */
function seleccionarVehiculo() {
    vehiculoSeleccionado = prompt("Ingrese el ID del vehiculo de su elección.");
    while( Number.isNaN(vehiculoSeleccionado) || vehiculoSeleccionado<1 || vehiculoSeleccionado>5) {
        alert("ID Erróneo, inténtelo de nuevo.");
        console.clear();
        listarVehiculos();
        seleccionarVehiculo();
    }
    const resultado = vehiculos.find(vehiculo => vehiculo.id === vehiculoSeleccionado);
    console.clear();
    console.log("Vehiculo seleccionado: ");
    console.log(resultado);
    return resultado;
}

function confirmarCompra() {
    let confirmarCompra = confirm("¿Desea adquirir "+vehiculo.marca+" "+vehiculo.modelo+" por un valor de: "+vehiculo.precio+"?")
    if(!confirmarCompra) {
        return 0;
    }
}

function cotizarSeguro (precio) {

    const porcentajePoliza = 0.0037;
    const seguroBasico = 4050;  
    let precioSeguro=0;

    /*  para todos los vehiculos con valor mayor a 1M y menor a 5M se cobra 
        un seguro con un valor del 0.37% del valor del auto.                */
    if(precio>1000000 && precio<5000000) {
        precioSeguro = precio*porcentajePoliza;
    }

    // para los que valen menos de 1M se establece un precio general de $4.050
    else if (precio<1000000) {
        precioSeguro = seguroBasico;
    }

    // Los que valgan mas de 5M deben solicitar atencion personalizada por el alto valor del vehiculo
    else {
        alert("Vehiculo de alto valor, solicite asesoría personalizada para cotizar.");
        return 0;
    }
    return precioSeguro;
}