
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