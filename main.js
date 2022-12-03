const cuotasPorAnio = 12;
const tasaAnual = 0.45;
const descuentoContado = 0.95;
let capitalInicial,
pagoMensual,
aniosFinanciacion,
capitalFinal,
cuotasFinales,
cotizar,
precioSeguro,
montoTotal,
montoAnticipo = 0;
let arrayHistorial = [];

/* TESTEADO: 26/11 16:00hs. Funcionando correctamente <3 */


/* Los datos correspondientes a los vehiculos fueron cargados en un array de objetos.*/

const vehiculos = [

    {
        id: 1,
        marca: "AUDI",
        modelo: "A1",
        anio: 2020,
        kilometraje: 50000,
        precio: 3500000,
        img: "/img/audi-a1.jpg"
    },

    {
        id: 2,
        marca: "AUDI",
        modelo: "Q5",
        anio: 2013,
        kilometraje:
        92000,
        precio: 6000000,
        img: "/img/audi-q5.jpg"

    },

    {
        id: 3,
        marca: "ALFA ROMEO",
        modelo: "MITO",
        anio: 2014,
        kilometraje: 110000,
        precio: 2900000,
        img: "/img/alfa-mito.jpg"

    },

    {
        id: 4,
        marca: "FORD",
        modelo: "FOCUS",
        anio: 2022,
        kilometraje: 0,
        precio: 4000000,
        img: "/img/ford-focus.jpg"

    },

    {
        id: 5,
        marca: "FORD",
        modelo: "MAVERICK",
        anio: 2022,
        kilometraje: 0,
        precio: 6900000,
        img: "/img/ford-maverick.jpg"

    }
];

// // APLICAMOS EL IVA AL VALOR DE LA UNIDAD
// const aplicarIva = (precio) => {return precio*1.21};
// vehiculo.precio = aplicarIva(vehiculo.precio);
// // console.log("Precio del vehiculo con IVA: "+vehiculo.precio);




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
        return 0;
    }
    return precioSeguro;
}

const listarCatalogo = () => {
    const catalogo = document.getElementById("listado");

    vehiculos.forEach ( vehiculo => {
        const div = document.createElement("div");
            div.classList.add("card");
            div.innerHTML +=`
            <img src="${vehiculo.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${vehiculo.marca} ${vehiculo.modelo}</h5>
              <p class="card-text">
                Año: ${vehiculo.anio}
                Km: ${vehiculo.kilometraje}
                <h3>$${new Intl.NumberFormat('es-AR').format(vehiculo.precio)}</h3>
              </p>
              <button href="#" class="btn btn-primary" value="${vehiculo.id}" >Consultar</button>
            </div>`
        catalogo.appendChild(div);
    } )
}

listarCatalogo();

let listado = document.getElementById("listado");
let seleccion = listado.addEventListener("click", (e) => {
    pintarVehiculo(e.target.value);
})

function pintarVehiculo(id){
    vehiculos.forEach( vehiculo => {
        if (vehiculo.id == id) {
            let seleccionado = document.getElementById("seleccionado");
            seleccionado.innerText = `${vehiculo.marca} ${vehiculo.modelo}`
            let precioSeleccionado = document.querySelector("#precioVehiculo span");
            precioSeleccionado.innerText = new Intl.NumberFormat('es-AR').format(vehiculo.precio);
            guardarVehiculoStorage(vehiculo);
            guardarVehiculoHistorial(vehiculo);
        }
    });
};

//Escucho si se pide cotizacion para asegurar el vehiculo.

let cotizacion = document.getElementById("cotizar");
cotizacion.addEventListener("click", (e) => {
    cotizarBoton(e.target.value);

})

function cotizarBoton (value) {
    let polizaSeleccionado = document.getElementById("polizaVehiculo");
    if (value === "cotizar") {
        let vehiculoParse = JSON.parse(localStorage.getItem("vehiculo"))
        precioSeguro = cotizarSeguro(vehiculoParse.precio);
        if (precioSeguro!=0){
            polizaSeleccionado.innerText = `Valor seguro: $${new Intl.NumberFormat('es-AR').format(precioSeguro)}`;
        }
        else {
            polizaSeleccionado.innerText = `Vehiculo de alto valor, solicite asesoría personalizada.`;
        }
    }
};

//Funcion que almacena en Storage.
const guardarVehiculoStorage = (vehiculo) => {
    localStorage.setItem("vehiculo", JSON.stringify(vehiculo));
};


//  Descuento por abonar en efectivo.

let pagoEfectivo = document.getElementById("efectivo");
pagoEfectivo.addEventListener("click", (e) => {
    pagoContado(e.target.value);
});

function pagoContado (value) {
    if (value === "efectivo") {
        let vehiculo = JSON.parse(localStorage.getItem("vehiculo"));
        precioOferta = vehiculo.precio*descuentoContado;
        let precioUnidad = document.getElementById("precioVehiculo");
        // alert(`Oferta de contado: 1 pago de: $${new Intl.NumberFormat('es-AR').format(precioOferta)}`)
        swal({
            text: `Oferta de contado: 1 pago de: $${new Intl.NumberFormat('es-AR').format(precioOferta)}`,
          });
    }
}

//  Financiacion

let financiar = document.getElementById("financiar");
financiar.addEventListener("click", (e) => {
    financiacion(e.target.value);
});

function financiacion (value) {
    if (value === "financiar") {
        console.log("Financiacion calculada con exito!");
        let vehiculo = JSON.parse(localStorage.getItem("vehiculo"));
        let cantidadCuotas = obtenerCuotas();
        let valorFinal = calcularFinanciacion(vehiculo.precio, cantidadCuotas);
        console.log(valorFinal);
        pagoMensual = valorFinal/cantidadCuotas;
        pintarFinanciacion(cantidadCuotas, pagoMensual, valorFinal, vehiculo.precio);
    }
};


function obtenerCuotas () {
    const select = document.querySelector("#selector");
    select.addEventListener("change", () => {
        console.log(select.value);
    })
    let cantidadCuotas = select.value;
    return cantidadCuotas;
}

function calcularFinanciacion(capitalInicial, cantidadCuotas) {
    aniosFinanciacion = cantidadCuotas/cuotasPorAnio;
    let aux1 = 1+tasaAnual;
    let aux2 = Math.pow(aux1,aniosFinanciacion);
    let capitalFinal = capitalInicial * aux2;
    cuotasFinales = capitalFinal/cantidadCuotas;
    return capitalFinal;
}

function pintarFinanciacion(cantidadCuotas, valorCuota, montoFinal, precioVehiculo) {
    cantidadPagos = document.getElementById("cantidadPagos");
    cantidadPagos.innerText = cantidadCuotas;

    precioCuota = document.getElementById("valorCuota");
    precioCuota.innerText = new Intl.NumberFormat('es-AR').format(valorCuota);
    
    pagoFinanciado = document.getElementById("montoFinal");
    pagoFinanciado.innerText =new Intl.NumberFormat('es-AR').format(montoFinal);

    precioUnidad = document.getElementById("precioUnidad");
    precioUnidad.innerText = new Intl.NumberFormat('es-AR').format(precioVehiculo);
}

function guardarVehiculoHistorial  (vehiculoAlmacenado)  {
    arrayHistorial.push(vehiculoAlmacenado);
    console.log(arrayHistorial);
    let arrayJSON = JSON.stringify(arrayHistorial)
    localStorage.setItem("historial", arrayJSON);
    pintarHistorial(arrayHistorial);
};

function pintarHistorial(arrayHistorial){
    const historial = document.getElementById("listadoHistorial");
    const div = document.createElement("div");
    historial.innerHTML = ` `
    arrayHistorial.forEach(vehiculo => {
        div.classList.add("elementoHistorial");
        div.classList.add("mx-auto");
        div.innerHTML +=`<p>${vehiculo.marca} ${vehiculo.modelo} MOD. ${vehiculo.anio} $${new Intl.NumberFormat('es-AR').format(vehiculo.precio)}</p>`
        historial.appendChild(div);
    })
} 




function obtenerHistorialStorage(){
    const historialStorage = JSON.parse(localStorage.getItem("historial"));
    return historialStorage;
}

document.addEventListener("DOMContentLoaded", () => {
    let arrayHistorial = obtenerHistorialStorage();
    pintarHistorial(arrayHistorial);

})