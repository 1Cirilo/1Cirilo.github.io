/*$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop()>0){
            $('header').addClass('header2');
        }else{
            $('header').removeClass('header2');
        }
    });
});*/

const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');

let tamañoIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamañoIndicador + 'px';

let indexSeccionActiva;

//observer
const observer = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting){
            //Obtenemos cual es la seccion que esta entrando en pantalla.
            //console.log(`La entrada ${entrada.target.id} esta intersectando`);

            //creamos un arreglo con las secciones y luego obtenemos el index de la secccion que esta en pantalla
            indexSeccionActiva = [...secciones].indexOf(entrada.target);

            indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
        }7
    })
} , {
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.2
});

//Agregamos un observador para el hero
observer.observe(document.getElementById('hero'));

//Asignacion del observer a cada una de las secciones
secciones.forEach(seccion => observer.observe(seccion));
//evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
    //Calculamos el nuevo tamaño que deberia tener el indicador
    tamañoIndicador = menu.querySelector('a').offsetWidth;

    //Cambiamos el tamaño del indicador
    indicador.style.width = `${tamañoIndicador}px`;

    //Volvemos a posicionar el indicador
    indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize);