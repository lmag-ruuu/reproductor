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

const cambiarIconoxD = () => {
  const elemento = document.getElementById("playText");
  let contenido = elemento.textContent;
  elemento.textContent = contenido === "Play" ? "Pause" : "Play";
};