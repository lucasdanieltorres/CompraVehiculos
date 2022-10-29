let marca = 0;
let modelo = 0;
let vehiculo = "";
let precio = 0;
let precioSeguro=0;
// let costosPatentamiento=0;
// let precioInscripcion=0;


comprarVehiculo();
let cotizar = confirm("¿Le gustaría cotizar un seguro para su vehículo?");
if(cotizar) {
    cotizarSeguro(vehiculo, precio);
}
let financiar = confirm("¿Desea financiar su vehículo?")
if(financiar) {
    calcularFinanciacion(precio);
}
function comprarVehiculo() {
    do{
        marca = parseInt(prompt("Seleccione el número de marca:\n1-Peugeot\n2-Ford\n3-Toyota\n"));
    }
    while(Number.isNaN(marca) || marca<1 || marca>3);

    /* Para elegir el modelo usé dos switch's anidados, el primero determina la marca, 
    el segundo el modelo dentro de cada una */

    switch (marca) {
        case 1:
            vehiculo = "Peugeot ";
            do{
                modelo = parseInt(prompt("Seleccione el número de modelo:\n1-206\n2-207\n3-307\n4-308"));
            }
            while (Number.isNaN(modelo) || modelo<1 || modelo>4);
            
            switch (modelo) {
                case 1:
                    vehiculo+="206";
                    precio=980000;
                    break;
                case 2:
                    vehiculo+="207";
                    precio=1270000;
                    break;
                case 3:
                    vehiculo+="307";
                    precio=1400000;
                    break;
                case 4:
                    vehiculo+="308";
                    precio=3050000;
                break;
                default:
                    alert("El modelo ingresado es incorrecto");
                    break;
            }
            break;
    
        case 2:
            vehiculo = "Ford ";
            do{
                modelo = Number(prompt("Seleccione el modelo:\n1-Fiesta\n2-Focus\n3-Ranger\n4-Raptor"));
            }
            while (Number.isNaN(modelo) || modelo<1 || modelo>4)

            switch (modelo) {
                case 1:
                    vehiculo+="Fiesta";
                    precio=2200000;
                    break;
                case 2:
                    vehiculo+="Focus";
                    precio=2700000;
                    break;
                case 3:
                    vehiculo+="Ranger";
                    precio=6000000;
                    break;
                case 4:
                    vehiculo+="Raptor";
                    precio=15000000;
                break;

                /* El default no seria necesario puesto que el Do.. while valida que no se ingrese una opcion incorrecta. 
                Elegi dejarlo por una cuestion de buenas practicas.*/
                default:
                    alert("El modelo ingresado es incorrecto");
                    break;
            }
            break;
    }
    console.log("Vehiculo seleccionado: "+vehiculo +" Precio: "+precio);
}

function calcularFinanciacion(precio) {
    let precioConIntereses = precio;
    let tasaInteres = 1.60;
    let precioFinanciadoTotal=0;
    let cantidadCuotas = parseInt(prompt("¿En cuantas cuotas le gustaría financiar su vehículo?\n24\n36\n48\n72"));
    let realizarAdelanto = confirm("¿Desea realizar un adelanto en efectivo?");
    if (realizarAdelanto) {
        let adelanto = Number(prompt("Ingrese el monto total del adelanto en efectivo: "));
        precioConIntereses = precio - adelanto;
    }
    
    for ( let i = 1 ; i <= cantidadCuotas/12 ; i++) {
        precioConIntereses = precioConIntereses*tasaInteres;
        // console.log("Año "+i+" - Precio: "+ precioConIntereses);
        precioFinanciadoTotal+= precioConIntereses;
    }
    let valorCuota= precioFinanciadoTotal/cantidadCuotas;
    console.log("Tasa Efectiva Anual: 60%");
    console.log("Valor final de la cuota "+valorCuota);
}

function cotizarSeguro(vehiculo, precio) {
    let precioSeguro=0;
    const seguro = 0.0037;
    const gamaMedia = 1750;
    const gamaAlta = 2700;
    if(precio<=1000000) {
        precioSeguro=4700;
    }
    else if (precio>1000000 && precio<1800000){
        precioSeguro = (precio*seguro);
    }
    else if (precio>=1800000 && precio<3200000) {
        precioSeguro = (precio*seguro)+gamaMedia;
    }
    else if (precio>=3200000 && precio<8000000) {
        precioSeguro = (precio*seguro)+gamaAlta;
    }
    else {
        alert("Vehículo de alto valor. Por favor, solicite una asesoría personalizada para cotizar");
        return 0;
    }
    console.log("El precio de un seguro completo para su "+vehiculo+" es de: "+precioSeguro);
}