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
confirmarCompra();
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

//FINANCIACION (FALTA CORREGIR FORMULAS.)
let financiar = confirm("¿Desea estimar la financiacion para la unidad seleccionada?");
if (financiar) {
    pagoMensual = calcularFinanciacion(precioTotal);
    console.log("Valor de la cuota: "+pagoMensual);
}




function comprarVehiculo() {
    alert("Bienvenido, presione ACEPTAR para ver el listado de vehiculos");
    listarVehiculos();
}

/* 
NOTA: calcularFinanciacion aun funciona con irregularidades, debe corregirse.

calcularFinanciacion toma el valor total del vehiculo y lo aplica en la siguiente formula:

    {A=P*(r(1+r)^{n})/((1+r)^{n}-1)

A = el pago mensual.
P = el capital principal
r = la tasa de interés por mes, que es igual a la tasa de interés anual dividida entre 12
n = el número total de meses

*/

function calcularFinanciacion (precioTotal) {
    const tasaAnual = 0.60;
    const tasaMensual = tasaAnual/12;
    let anticipo = confirm("¿Desea realizar un anticipo en efectivo?");
    if (anticipo) {
        pagoInicial = Number(prompt("Ingrese el valor del anticipo en efectivo\nSe recomienda anticipar, al menos, el 40% del valor total de la unidad"));
        precioTotal-=pagoInicial;
    }
    let cuotas = parseInt(prompt("¿En cuantas cuotas desea financiar el monto?\nMinimo:6     Maximo:72"));
    const valorCuota = precioTotal * (tasaMensual* Math.pow((1+tasaMensual),cuotas)) / (Math.pow((1+tasaMensual),cuotas)-1);
    return valorCuota;
}

// listarVehiculos recorre cada objeto del array y lo imprime, dejando ver el listado completo de vehiculos.
function listarVehiculos() {
    vehiculos.forEach((vehiculo) => {
        console.log(vehiculo)
    });
}  


/* la funcion de seleccionarVehiculo trabaja con el ID de cada unidad, y retorna el objeto correspondiente al vehiculo */
function seleccionarVehiculo() {
    vehiculoSeleccionado = parseInt(prompt("Ingrese el ID del vehiculo de su elección."));
    while(vehiculoSeleccionado<1 || vehiculoSeleccionado>5) {
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