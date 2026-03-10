# ![Logo](./assets/GoQuiz-tiny.png)

### Aplicación desarrollada para hacer Test de todo tipo, cualquier número de preguntas y en archivos json.

#### Sept 2025 - Rogelio Suárez Tejera. 
##### v.3 Marzo 2026.


### Manual de uso

- Admite cualquier número de respuestas. 

- Preguntas en formato JSON en archivos externos, que el usuario carga a su voluntad.

- La aplicación recuerda el estado del último exámen si se dejó a medias, y lo carga automáticamente
  en el inicio junto con el estado de las preguntas. Para esto la única condición es que el archivo JSON
  contínue en su lugar y con su nombre igual. No se recomienda modificar el JSON cuando un exámen se ha 
  dejado a medias, eliminando preguntas. Si esto se hace el siguiente inicio de la aplicación puede dar 
  algun problema en la carga del JSON. En el improbable caso de que esto ocurriera, la solución sería 
  limpiar la cache del navegador para borrar los estados de todos los examenes que se han cargado.

- Filosofía de "cuanto mas simple mas útil": El usuario puede reiniciar el exámen cuando quiera usando 
  para ello el boton RESET-ALL, que reactiva todas las preguntas y pone marcadores a 0. Tambien puede 
  responder cualquier número de veces hasta acertar la pregunta, que es cuando se desactivará. 
  Aún así, si se quiere simular un exámen real, hasta que no se implemente el modo exámen, se puede dejar 
  la pregunta mal respondida si se desea, y esta se contabilizará como errónea en el marcador. 

- En el JSON, si en cada pregunta se incluyen los apartados "referencia" y "explicacion",
  entonces se hará visible el botón "Ver detalle" en cada tarjeta de preguntas, y que sirve para mostrar 
  la referencia al texto fuente original y la explicación que se haya incluido. Lo que ayuda a memorizar 
  en el mismo momento.

- Posibilidad de cambiar entre modos claro y oscuro.

### TO-DOs: 
- Crear un menu con todas las opciones de botones, replegable de hamburguesa, y eliminar las opciones mediante botones.

- Crear opciones Ayuda, Acerca, Privacidad, Legal.

- Incluir un modo exámen donde se eliminen las opciones de ver la explicación, resetear el exámen, así 
  como un contador de tiempo, y un cálculo de puntuación en base a reglas personalizables.

- Crear opcion "Reactivar pregunta", para reactivar de nuevo una pregunta ya respondida correctamente.

- Crear un boton "Marcar facil", para marcar preguntas demasiado faciles y que no salgan en una nueva ronda del test.

- Crear un boton "Reiniciar ronda dificiles", para reiniciar una nueva ronda del examen, limpiando las respuestas y marcadores,
  pero dejando el array faciles intacto.

- Crear boton "Exportar json dificiles", para crear un nuevo json solo con las preguntas que no han sido marcadas como faciles.



## Formato del JSON:
```JSON
{"Titulo exámen": 
[
    {
        "texto": "1. texto de la pregunta",
        "opciones": [
            "A) Opcion 1",
            "B) Opcion 2.",
            "C) Opcion 3.",
            ...
            "X) Opción n."
        ],
        "respuesta": "C) Opcion 3.",  # debe ser igual al texto correcto en la sección "opciones"
        "referencia": "Libro, Modulo, Unidad, Apartado, titulo, pág.",
        "explicacion": "Texto de la explicación y/o cita del texto original"
    },
...
]}

