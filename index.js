document.addEventListener("DOMContentLoaded", function(){
    title = document.getElementById('title');
    btn = document.getElementById('add');
    btnRemoveAll = document.getElementById('removeAll');
    rellenarCampos = document.getElementById('camposObligatorios');
    table = document.getElementById('table');
    tBody = document.getElementById('tb');

    inputFilter = document.getElementById('filter');

    let id = 0;

    var tasks = [];



    // Filtro para buscar entre las tareas.
    inputFilter.addEventListener('input', function() {

        var valor, y, txtValue, inputCase;

        tr = document.getElementsByClassName('table-success');
        
        inputCase = inputFilter.value.toUpperCase();


        for(y = 0; y < tr.length; y++){
            valor = tr[y].getElementsByTagName("td")[0];

            if(valor) {
                
                txtValue = valor.textContent;
                if (txtValue.toUpperCase().indexOf(inputCase) > -1) {
                    tr[y].style.display = "";
                } else {
                    tr[y].style.display = "none";
                }
            }
            
        }
    });
    

    // Mirar si tiene tablas, si no tiene que ponga el id a 0
    function comprobarHijos() {
        if(!tBody.hasChildNodes()){
            id = 0;
        }
    }

    // Mirar si tiene valores en el localStorage
    var storedNames = JSON.parse(localStorage.getItem("tasks"));


    // Si no tiene informacion que no haga nada pero si tiene en el local que las imprima en pantalla
    if(storedNames === null || storedNames.length === 0){
        console.log('No Hay informacion');
        tasks = [];
    }else{
        console.log('Hay informacion');
        tasks = storedNames;
        let idStorage = 0;
        storedNames.forEach(element => {
            const rowStorage = table.insertRow();
            
            table.children[1].appendChild(rowStorage);

            rowStorage.classList.add("table-success");
            
            rowStorage.setAttribute('id', idStorage++);
            
            // Añadir texto HTML directamente
            rowStorage.innerHTML = `
                <tr>
                    <td>${ element }</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;


            const borrarBtnStorage = document.createElement('button');
            borrarBtnStorage.classList.add('btn', 'btn-danger');
            borrarBtnStorage.innerHTML = `<i class="fa fa-trash"></i>`

            rowStorage.children[1].appendChild(borrarBtnStorage);

            borrarBtnStorage.addEventListener('click', function(){
                eliminarTarea(rowStorage.getAttribute('id'));
            })
        });
    }


    // Funcion para añadir nueva tarea
    function añadirElemento(){
        if(title.value == ''){
            // Aparezca un mensaje de que falta campos para rellenar y se sale de la funcion.
            rellenarCampos.classList.remove('d-none');
            return;
        }
        // d-none (display-none) es para que no se vea en el DOM
        rellenarCampos.classList.add('d-none');

        // Añadir fila nueva a la tabla.
        const row = table.insertRow();

        table.children[1].appendChild(row);

        // Para poner el color verde del bootwatch
        row.classList.add("table-success");
        // Darles Atributos a la tabla con una ID para poder identificarla
        row.setAttribute('id', id);
        
        // Añadir texto HTML directamente
        row.innerHTML = `
            <td>${ title.value }</td>
            <td class="text-right">
            </td>
        `;

        // Creacion del boton
        const borrarBtn = document.createElement('button');
        borrarBtn.classList.add('btn', 'btn-danger');
        borrarBtn.innerHTML = `<i class="fa fa-trash"></i>`

        row.children[1].appendChild(borrarBtn);

        borrarBtn.addEventListener('click', function(){
            eliminarTarea(row.getAttribute('id'));
            comprobarHijos();
        })

        // Guardar informacion en localStorage, en este caso lo guardo en una array, empujando los valores.
        tasks.push(title.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        id++;

        var elCount = row.childElementCount;

        console.log(elCount);
    }


    // Funcion para eliminar tarea con el boton basura(rojo)
    function eliminarTarea(idEliminar) {
        // localStorage.removeItem(tasks[idEliminar]);
        document.getElementById(idEliminar).remove();
        
        tasks.splice(tasks[idEliminar], 1);

        console.log(`Este el id que se va a eliminar la linea ${idEliminar}`);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        console.log(tasks);
        
    }


    // Funcion con el boton de 'Clear tasks'
    function eliminarTodasTareas() {
        
        while(tb.hasChildNodes()) {
            tBody.removeChild(tBody.firstChild);
        }

        localStorage.clear();
        id = 0;
    }



    // Creacion de nueva linea en la tabla.
    btn.onclick = añadirElemento;

    //Eliminar toda la informacion del localStorage
    btnRemoveAll.onclick = eliminarTodasTareas;

    

});