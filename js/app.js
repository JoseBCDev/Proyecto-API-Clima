
const contenido = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault()

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    

    if(ciudad === '' || pais === '')
    {
        mostrarError('Todos los campos son Obligatorios');
        
        return;
    }

    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje)
{
    const alert = document.querySelector('.bg-red-100');

    if(!alert)
    {
        const alerta = document.createElement('div');

            alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');
            
            alerta.innerHTML = `
                <strong class="font-bold">Error!</strong>
                <span class="block">${mensaje}</span>
                `;

            contenido.appendChild(alerta);

            //Eliminamos la alerta durante luego de 3s
            setTimeout(() => {
                alerta.remove();
            }, 3000);
    }
}

function consultarAPI(ciudad,pais)
{
    //ID DE LA API OpenWeather
    const idAPI = '2f62d0c67fe8e57400658e45b46ab738';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${idAPI}`;

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            limpiarHTML();
            if(resultado.cod === '404')
            {
                mostrarError('No se encontro el Clima');

                return;
            }
            mostrarClima(resultado);
            })
}

function mostrarClima(datos)
{
    const {name,main:{temp,temp_max,temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.classList.add('font-bold','text-2xl');
    nombreCiudad.innerHTML = `Clima en ${name}`;

    const actual = document.createElement('p');
    actual.classList.add('font-bold','text-6xl');
    actual.innerHTML = `${centigrados} &#8451;`

    const tempmax = document.createElement('p');
    tempmax.classList.add('font-bold','text-2xl');
    tempmax.innerHTML = `Max: ${max} &#8451`;

    const tempmin = document.createElement('p');
    tempmin.classList.add('font-bold','text-2xl');
    tempmin.innerHTML = `Min: ${min} &#8451`;

    const resultadoDIV = document.createElement('div');
    resultadoDIV.classList.add('text-center','text-white');

    resultadoDIV.appendChild(nombreCiudad);
    resultadoDIV.appendChild(actual);
    resultadoDIV.appendChild(tempmax);
    resultadoDIV.appendChild(tempmin);

    resultado.appendChild(resultadoDIV);


}

const kelvinACentigrados = (kelvin)=> parseInt(kelvin-273.15);
/* function kelvinACentigrados(kelvin)
{
    return parseInt(kelvin-273.15);
} */

function limpiarHTML()
{
    while(resultado.firstChild)
    {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner()
{
    limpiarHTML();

    const cargando = document.createElement('div');
    cargando.classList.add('spinner');
    cargando.innerHTML = `
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    `;

    resultado.appendChild(cargando);
}