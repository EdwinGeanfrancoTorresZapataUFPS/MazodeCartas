document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencia a la tabla y al formulario
    const tabla = document.getElementById("cardTable");
    const formulario = document.getElementById("dataForm");
  
    // Obtener datos del localStorage o inicializar un array vacío si no hay datos
    let datos = JSON.parse(localStorage.getItem("datos")) || [];
  
    // Función para renderizar la tabla
    function renderizarTabla() {
      // Limpiar contenido de la tabla
      tabla.innerHTML = "";
  
      // Ordenar los datos por cantidad de cartas de mayor a menor
      datos.sort((a, b) => b.Cantidad - a.Cantidad);
  
      // Iterar sobre los datos para agregar filas a la tabla
      datos.forEach((elemento, indice) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${elemento.Numero}</td>
            <td>${elemento.Carta}</td>
            <td>${elemento.Cantidad}</td>
        `;
        tabla.appendChild(fila);
      });
    }
  
    // Función para manejar el envío del formulario
    function manejarEnvioFormulario(evento) {
      evento.preventDefault();
      const numeroInput = document.querySelector("#dataForm input[name='cardNumber']").value;
      const cartaInput = document.querySelector("#dataForm input[name='cardName']").value;
  
      // Verificar que se ingresen datos válidos
      if (numeroInput && cartaInput) {
        // Agregar el nuevo elemento al array de datos
        datos.push({ Numero: numeroInput, Carta: cartaInput, Cantidad: 0 });
  
        // Limpiar los campos del formulario
        evento.target.reset();
  
        // Actualizar los datos en el localStorage y renderizar la tabla
        localStorage.setItem("datos", JSON.stringify(datos));
        renderizarTabla();
      } else {
        alert("Por favor complete todos los campos del formulario.");
      }
    }
  
    // Función para manejar el clic en los botones de las cartas
    function manejarClicCarta(evento) {
      const cartaSeleccionada = evento.currentTarget.dataset.card;
      // Buscar la carta seleccionada en los datos y aumentar su cantidad
      const carta = datos.find(elemento => elemento.Numero === cartaSeleccionada);
      if (carta) {
        carta.Cantidad++;
      }
  
      // Actualizar los datos en el localStorage y renderizar la tabla
      localStorage.setItem("datos", JSON.stringify(datos));
      renderizarTabla();
    }
  
    // Agregar event listeners
    document.querySelectorAll(".card-btn").forEach(carta => {
      carta.addEventListener("click", manejarClicCarta);
    });
  
    formulario.addEventListener("submit", manejarEnvioFormulario);
  
    // Renderizar la tabla al cargar la página
    renderizarTabla();
  });
  