const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR8GjawBFkzoQSaXuE6K9Ts_fQGPASDeZv2DxnCHvWjNv9JR4BJxGk_qsQK_PxDl4bdia_P7GvOFp0X/pub?output=csv";

fetch(URL_CSV)
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n").filter(row => row.trim() !== "");
    if (rows.length < 2) return; // No hay datos

    // Extrae los valores entre comillas (para números decimales con coma)
    const regex = /"([^"]*)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(rows[1])) !== null) {
      matches.push(match[1]);
    }

    // Extraer los datos directamente por índice de la segunda fila
    const secondRow = rows[1].split(",");

    // Asignación de valores específicos según la posición correcta en el archivo CSV
    const generoM = secondRow[18].trim().replace(/"/g, ""); 
    const generoH = secondRow[19].trim().replace(/"/g, ""); 
    const generoO = secondRow[20].trim().replace(/"/g, ""); 

    const profE = secondRow[23].trim().replace(/"/g, ""); 
    const profT = secondRow[24].trim().replace(/"/g, ""); 
    const profO = secondRow[25].trim().replace(/"/g, ""); 

    // Extraer el último valor de la fila como 'players'
    let players = "";
    for (let i = secondRow.length - 1; i >= 0; i--) {
      if (!secondRow[i].startsWith('"') && secondRow[i].trim() !== "") {
        players = secondRow[i].trim().replace(/"/g, "");
        break;
      }
    }
    const edad      = matches[1];
    const imc       = matches[2];
    const aciertos  = matches[3];

    document.getElementById("estadisticaEdad").innerHTML = `<span style="color:red;">${edad}</span>`;
    document.getElementById("estadisticaSexo").innerHTML = `<span style="color:red;">${generoM}%/${generoH}%/${generoO}%</span>`;
    document.getElementById("estadisticaIMC").innerHTML = `<span style="color:red;">${imc}</span>`;
    document.getElementById("estadisticaOcupacion").innerHTML = `<span style="color:red;">${profE}%/${profT}%/${profO}%</span>`;
    document.getElementById("estadisticaPorcentaje").innerHTML = `<span style="color:red;">${aciertos}%</span>`;
    document.querySelector(".texto6").innerHTML = `PLAYERS: <span style="color:red;">${players}</span>`;

    console.log({ generoM, generoH, generoO, profE, profT, profO, players });
  })
  .catch(error => console.error("Error al obtener los datos:", error));
