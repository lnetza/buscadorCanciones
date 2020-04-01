import { API } from './api.js';
import * as UI from './interfaz.js';


UI.formularioBuscar.addEventListener('submit', (e)=>{
    e.preventDefault();
    //Obtener datos del formulario
    const artista=document.querySelector('#artista').value,
          cancion=document.querySelector('#cancion').value;
    
    if(artista ==='' || cancion===''){
        //El usuario dejo los campos vacios, mostrar ERROR
        UI.divMensajes.innerHTML='Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML='';
            UI.divMensajes.classList.remove('error');
        }, 3000);
    }else{
        //El formulario esta completo, realizar consulta a la API
        const api=new API(artista, cancion);
        api.consultarAPI()
            .then(data =>{
                //console.log(data);
                if(data.respuesta.lyrics){
                    //La canción existe
                    const letra= data.respuesta.lyrics;
                    UI.divResultado.textContent=letra;
                    
                }else{
                    //La canción no EXISTE
                    UI.divMensajes.innerHTML='La canción no existe o la escribiste mal';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                        UI.divMensajes.innerHTML='';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                    }, 3000);
                }
            });
    }

});