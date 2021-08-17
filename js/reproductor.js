const canciones = [
  "bensound-dubstep.mp3",
  "bensound-erf.mp3",
  "bensound-house.mp3"
];
const elementosDOM = {
  playList: document.getElementById('playList'),
  playText: document.getElementById("playText"),
  volume: document.getElementById('vol'),
  progreso: document.getElementById('progreso'),
  time: document.getElementById('tiempo'),
  source: document.getElementById('source'),
  textoActual: document.getElementById('actual')
}

let indice = new Array(1);
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

elementosDOM.playList.appendChild(playList());

let listadoCanciones = document.getElementById('listadoMusica');

listadoCanciones.onclick = e => {
  const itemClick = e.target;
  removeActive();
  itemClick.classList.add('active');
  reproducirActual(`Reproduciendo: ${itemClick.innerText}`);
  loadMusic(itemClick.innerText);
  player.play();
  indice[0] = e.target.id;
  cambiarIconoxD();
};
//El "xD" es porque no es un icono pero no supe como llamarlo xd
const cambiarIconoxD = () => {
  const elemento = elementosDOM.playText;
  let contenido = elemento.textContent;
  elemento.textContent = contenido === "Play" ? "Pause" : "Play";
};

const volumen = elementosDOM.volume;
volumen.oninput = e => {
  const vol = e.target.value;
  player.volume = vol;
};

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
  if(player.ended){
    siguienteCancion();
  }
};

const siguienteCancion = () => {
  let siguiente;
  let cancionActual = Number(indice[0]);
  if (canciones.length == (cancionActual+1)){
    siguiente = 0;
  }else {
    siguiente = cancionActual + 1;
  }
  removeActive();
  let item = document.getElementById(siguiente);
  item.classList.add('active');
  loadMusic(canciones[siguiente]);
  player.play();
  indice[0] = siguiente;
  reproducirActual(`Reproduciendo: ${canciones[siguiente]}`);
  cambiarIconoxD();
};

const cancionAnterior = () => {
  let cancionActual = Number(indice[0]);
  let anterior;
  if (cancionActual === 0){
    anterior = canciones.length - 1;
  }else{
    anterior = cancionActual - 1;
  }
  removeActive();
  let item = document.getElementById(anterior);
  item.classList.add('active');
  loadMusic(canciones[anterior]);
  player.play();
  indice[0] = anterior;
  reproducirActual(`Reproduciendo: ${canciones[anterior]}`);
  cambiarIconoxD();
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

//Cargar las canciones en el reproductor
const loadMusic = (ruta) => {
  let carpeta, index, item;
  carpeta = `../canciones`;
  elementosDOM.source.src = `${carpeta}/${ruta}`;
  index = indice[0] = canciones.indexOf(ruta);//porq no solamente usar indice[0] ? xd
  removeActive();
  item = document.getElementById(index);
  item.classList.add("active");
  reproducirActual(`Reproduciendo: ${ruta}`);
  player.load();
};
const pausaPlay = () => {
  if (player.pause){
    cambiarIconoxD();
    return player.play();
  }else{
    cambiarIconoxD();
    return player.pause();
  }
};
//Adelantar la cansion
progreso.addEventListener('click', (e) => {
  const scrubTime = (e.offsetX / progreso.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
});
//Convertir minutos segundos y horas
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

loadMusic(canciones[0]);