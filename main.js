const cuotasPorAnio = 12; 
const tasaAnual = 0.45;
const descuentoContado = 0.95;
let cantidadCuotas,
capitalInicial,
pagoMensual,
aniosFinanciacion,
capitalFinal,
cuotasFinales,
cotizar,
precioSeguro,
financiar,
montoAnticipo = 0;

/* TESTEADO: 11/11 23:00hs. Funcionando correctamente <3 */


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

// APLICAMOS EL IVA AL VALOR DE LA UNIDAD
const aplicarIva = (precio) => {return precio*1.21};
vehiculo.precio = aplicarIva(vehiculo.precio);
console.log("Precio del vehiculo con IVA: "+vehiculo.precio);

cotizar = confirm("¿Desea cotizar un seguro para su vehiculo?");
if(cotizar) {
    precioSeguro = cotizarSeguro(vehiculo.precio);
    if (precioSeguro!=0){
        console.log("Valor seguro contra todo riesgo para "+vehiculo.marca+" "+vehiculo.modelo+": $"+ precioSeguro);
    }
}


//FINANCIACION
financiar = confirm("¿Desea estimar la financiacion para la unidad seleccionada?");
if (financiar) {
    let anticipar = confirm("¿Desea realizar un anticipo en efectivo?");
    if(anticipar) {
        capitalInicial=anticipo(vehiculo.precio);
    }
    else {
        capitalInicial = vehiculo.precio;
    } 
    cantidadCuotas = validarCuotas();
    capitalFinal = calcularFinanciacion(capitalInicial, aniosFinanciacion);
    console.log("Monto a financiar: $"+capitalInicial+" en "+cantidadCuotas+" cuotas\n"+"Tasa Efectiva Anual: 45%\n"+"Monto a devolver: $"+capitalFinal+" en "+cantidadCuotas+" cuotas de: $"+cuotasFinales);

}

let confirmarCompra = confirm("¿Desea confirmar la operación?");
if (confirmarCompra) {
    totalAPagar();
}
else {
    alert("Operación cancelada");
}

function comprarVehiculo() {
    alert("Bienvenido, presione ACEPTAR para ver el listado de vehiculos");
    listarVehiculos();
}



// listarVehiculos recorre cada objeto del array y lo imprime, dejando ver el listado completo de vehiculos.

function listarVehiculos() {
    vehiculos.forEach((vehiculo) => {
        console.log("ID: "+vehiculo.id+" "+vehiculo.marca+" "+vehiculo.modelo+" | "+vehiculo.anio+" | $"+vehiculo.precio+" | KM: "+vehiculo.kilometraje);
    });
}  


/* la funcion de seleccionarVehiculo trabaja con el ID de cada unidad, y retorna el objeto correspondiente al vehiculo */
function seleccionarVehiculo() {
    vehiculoSeleccionado = parseInt(prompt("Ingrese el ID del vehiculo de su elección."));
    while(vehiculoSeleccionado<1 || vehiculoSeleccionado>5 ||Number.isNaN(vehiculoSeleccionado)) {
        alert("ID Erróneo, inténtelo de nuevo.");
        console.clear();
        listarVehiculos();
        seleccionarVehiculo();
    }
    const resultado = vehiculos.find(vehiculo => vehiculo.id === vehiculoSeleccionado);
    console.clear();
    console.log("Vehiculo seleccionado: ");
    console.log(resultado.marca+" "+resultado.modelo+" | "+resultado.anio+" | KM:"+resultado.kilometraje+" | $"+resultado.precio);
    return resultado;
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

    /* para los que valen menos de 1M se establece un precio general de $4.05 */
    else if (precio<1000000) {
        precioSeguro = seguroBasico;
    }

    /* Los que valgan mas de 5M deben solicitar atencion personalizada por el alto valor del vehiculo */
    else {
        alert("Vehiculo de alto valor, solicite asesoría personalizada para cotizar.");
        return 0;
    }
    return precioSeguro;
}

function validarCuotas() {
    let cantidadCuotas = 0;
    let resto = cantidadCuotas%cuotasPorAnio;
    cantidadCuotas = prompt("¿En cuantas cuotas desea financiar el monto?\n12\n24\n36\n48\n60\n72");
    while(resto!=0 || cantidadCuotas<12 || cantidadCuotas>72 || Number.isNaN(cantidadCuotas)) {
        console.error("error, ingrese una cantidad de cuotas valida");
        cantidadCuotas = prompt("¿En cuantas cuotas desea financiar el monto?\n12\n24\n36\n48\n60\n72");
    }
    aniosFinanciacion = cantidadCuotas/cuotasPorAnio;
    return cantidadCuotas;
}


/*  
    La formula calcularFinanciacion aplica una tasa efectiva anual del 45%, es decir, un interes compuesto. Similar a como se 
    calcula una financiacion real, utiliza la siguiente formula:

    Valor final = capital * (1+Interes)^tiempo 
*/ 

function calcularFinanciacion(capitalInicial, aniosFinanciacion) {
    let aux1 = 1+tasaAnual;
    let aux2 = Math.pow(aux1,aniosFinanciacion);
    let capitalFinal = capitalInicial * aux2;
    cuotasFinales = capitalFinal/cantidadCuotas;
    return capitalFinal;
}

function anticipo(montoTotal) {
    do {
        montoAnticipo = Number(prompt("Ingrese el monto total del anticipo:"));
    }
    while (montoAnticipo<=0 || montoAnticipo>vehiculo.precio || Number.isNaN(montoAnticipo));
    montoTotal-=montoAnticipo;
    return montoTotal;
}

function totalAPagar () {
    console.clear();
    console.log(vehiculo.marca+" "+vehiculo.modelo+" | "+vehiculo.anio+" | KM:"+vehiculo.kilometraje+" | $"+vehiculo.precio);
    if(financiar){
        console.log("Cuota a abonar de: $"+cuotasFinales+" por el valor de la unidad.");
    }
    else {

        /* Oferta por abonar de contado */

        vehiculo.precio = vehiculo.precio*descuentoContado;
        console.log("Precio oferta contado unidad: $"+vehiculo.precio);
    }
    if(precioSeguro!=0){
        console.log("Valor seguro contra todo riesgo: $"+precioSeguro);
    }
    alert("Un asesor se pondrá en contacto con usted. Gracias por su compra♥");
}
