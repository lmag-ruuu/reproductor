//El objeto reproductor tiene:
//1. Lista de canciones
const canciones = [
  "bensound-dubstep.mp3",
  "bensound-erf.mp3",
  "bensound-house.mp3",
  //aqui puedes poner mas canciones, recuerda deben estar en la carpeta canciones
  //"cancion.mp3"
];
//Elementos del dom
const elementosDOM = {
  playList: document.getElementById('playList'),
  playText: document.getElementById("playText"),
  volume: document.getElementById('vol'),
  progreso: document.getElementById('progreso'),
  time: document.getElementById('tiempo'),
  source: document.getElementById('source'),
  textoActual: document.getElementById('actual'),
  player: document.getElementById('player')
}
//Indice, este es para indicar la cancion actual
let indice = new Array(1);
//Boton de play y de pausa
const pausaPlay = () => {
  if (elementosDOM.player.paused){
    cambiarIconoxD();
    elementosDOM.player.play();
  }else{
    cambiarIconoxD();
    elementosDOM.player.pause();
  }
};
//Un boton siguiente y atrás
const siguienteCancion = () => {
  let siguiente;
  let cancionActual = Number(indice[0]);
  if (canciones.length == (cancionActual+1)){
    siguiente = 0;
  }else {
    siguiente = cancionActual + 1;
  }
  reproducir(siguiente);
};
const cancionAnterior = () => {
  let cancionActual = Number(indice[0]);
  let anterior;
  if (cancionActual === 0){
    anterior = canciones.length - 1;
  }else{
    anterior = cancionActual - 1;
  }
  reproducir(anterior);
};
//Leer la cancion y dar play enseguida owo
const reproducir = el => {
  loadMusic(canciones[el]);
  elementosDOM.player.play();
}
//La "barra" de progreso de la cancion òwó
const updateProgress = () => { 
  if(player.currentTime > 0) {
    let duracion, duracionSegundos, dura, actualSegundos, actual;
    const barra = elementosDOM.progreso;
    barra.value = (player.currentTime / player.duration) * 100;

    duracionSegundos = player.duration.toFixed(0);
    dura = secondsToString(duracionSegundos);
    actualSegundos = player.currentTime.toFixed(0);
    actual = secondsToString(actualSegundos);

    duracion = `${actual}/${dura}`;
    elementosDOM.time.innerText = duracion;
  }
  if(elementosDOM.player.ended){
    siguienteCancion();
  }
};
//Controla el volumen
const volumen = elementosDOM.volume;
volumen.oninput = e => {
  const vol = e.target.value;
  elementosDOM.player.volume = vol;
};
//Manipular el tiempo de reproduccion, desde la barra de reproduccion
progreso.addEventListener('click', (e) => {
  const scrubTime = (e.offsetX / progreso.offsetWidth) * elementosDOM.player.duration;
  elementosDOM.player.currentTime = scrubTime;
});
//Y por ultimo, Cargar las canciones en el reproductor
const loadMusic = (ruta) => {
  let carpeta, index, item;
  carpeta = `./canciones`;
  elementosDOM.source.src = `${carpeta}/${ruta}`;
  index = indice[0] = canciones.indexOf(ruta);//porq no solamente usar indice[0] ? xd
  removeActive();
  item = document.getElementById(index);
  item.classList.add("active");
  reproducirActual(`Reproduciendo: ${ruta}`);
  setPlay();
  elementosDOM.player.load();
};
//Mostrar el tiempo de la cancion en horas minutos segundos
const secondsToString = segundos => {
  let hour = "";
  if (segundos > 3600){
    hour = Math.floor(segundos / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
  }
  let minutos = Math.floor( (segundos / 60) % 60 );
  minutos = (minutos < 10) ? '0' + minutos : minutos;
  let segundo = segundos % 60;
  segundo = (segundo < 10) ? '0' + segundo : segundo;
  return `${hour}:${minutos}:${segundo}`;
};
//Cambiar el "icono" al dar play o pausa
//El "xD" es porque no es un icono pero no supe como llamarlo xd
const cambiarIconoxD = () => {
  const elemento = elementosDOM.playText;
  let contenido = elemento.textContent;
  elemento.textContent = contenido === "Pause" ? "Play" : "Pause";
};
//Listado de canciones
function playList () {
  const listado = document.createElement('ol');
  listado.setAttribute('id', 'listadoMusica');
  canciones.forEach ( (el, i) => {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(el));
    item.setAttribute('id', i);
    listado.appendChild(item);
  });
  return listado;
};
//playList crea la playList y appenChild los agrega para q se vean owo
elementosDOM.playList.appendChild(playList());
//Este es para aparezca play cada vez que se este reproduciendo
let setPlay = () => {
  elementosDOM.playText.textContent = "Play";
}
//Al darle click a una cancion, esta se reproduzca.
let listadoCanciones = document.getElementById('listadoMusica');
listadoCanciones.onclick = e => {
  const itemClick = e.target;
  removeActive();
  itemClick.classList.add('active');
  loadMusic(itemClick.innerText);
  elementosDOM.player.play();
  indice[0] = e.target.id;
  setPlay();
};
//quitar css activos
const removeActive = () => {
  const elems = document.querySelectorAll(".active");
  const newElem = elems.forEach(el => el.classList.remove("active"));
  return newElem;
};
const reproducirActual = texto => {
  elementosDOM.textoActual.innerText = texto;
}
//Este vendria siendo algo así como el init() xd
loadMusic(canciones[0]);
