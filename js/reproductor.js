const canciones = [
  "bensound-dubstep.mp3",
  "bensound-erf.mp3",
  "bensound-house.mp3"
];

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

document.getElementById('playList').appendChild(playList());

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
  const elemento = document.getElementById("playText");
  let contenido = elemento.textContent;
  elemento.textContent = contenido === "Play" ? "Pause" : "Play";
};

const volumen = document.getElementById('vol');
volumen.oninput = e => {
  const vol = e.target.value;
  player.volume = vol;
};

//La "barra" de progreso de la cancion òwó
const updateProgress = () => { 
  if(player.currentTime > 0) {
    let duracion, duracionSegundos, dura, actualSegundos, actual;
    const barra = document.getElementById('progreso');
    barra.value = (player.currentTime / player.duration) * 100;

    duracionSegundos = player.duration.toFixed(0);
    dura = secondsToString(duracionSegundos);
    actualSegundos = player.currentTime.toFixed(0);
    actual = secondsToString(actualSegundos);

    duracion = `${actual}/${dura}`;
    document.getElementById('tiempo').innerText = duracion;

  }
  if(player.ended){
    siguienteCancion();
  }
};
