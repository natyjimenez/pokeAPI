// Variable que recibe resultado de la iteración de la función buscar pokemon
let pokemones = []
// Función para recorrer y extraer info de la API
function buscarPokemon() {
    // Variable en que se almacena el valor del id  
    let id = $("#id").val();
    // Variable con dirección de consulta API concatenada a valor id del input
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    $.ajax({
        url,
        success: function (result) {
            console.log(result)
            let pokemon = {
                pokedex: result.id,
                nombre: result.name,
                hp: result.stats[0].base_stat,
                ataque: result.stats[1].base_stat,
                defensa: result.stats[2].base_stat,
                ataqueEspecial: result.stats[3].base_stat,
                defensaEspecial: result.stats[4].base_stat,
                velocidad: result.stats[5].base_stat,
                img: result.sprites.front_default
            };
            pokemones.push(pokemon);
            console.log(pokemones);
            
            // Gráfico Canvas
            var options = {
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: result.name
                },
                legend: {
                    horizontalAlign: "right",
                    verticalAlign: "center"
                },
                data: [{
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "<b>{name}</b>: {y} (#percent%)",
                    indexLabel: "{name}",
                    legendText: "{name} (#percent%)",
                    indexLabelPlacement: "inside",
                    dataPoints: [{
                            y: result.stats[0].base_stat,
                            name: "hp"
                        },
                        {
                            y: result.stats[1].base_stat,
                            name: "ataque"
                        },
                        {
                            y: result.stats[2].base_stat,
                            name: "defensa"
                        },
                        {
                            y: result.stats[3].base_stat,
                            name: "ataque especial"
                        },
                        {
                            y: result.stats[4].base_stat,
                            name: "defensa especial"
                        },
                        {
                            y: result.stats[5].base_stat,
                            name: "velocidad"
                        },
                    ]
                }]
            };
            $("#chartContainer").CanvasJSChart(options);

            // Función iteradora que extrae los datos para imprimir en el card
            pokemones.forEach((p, i) => {
                $('#cuerpo').html(`
                <div class="card">
                    <h1 class="pokeName">${p.nombre.toUpperCase()}</h1><br>
                    <h5 class="pokeNum">N°${p.pokedex}</h5> 
                    <img  src="${p.img}" width="100" class ="pokeImg" /> 
                    <div class="stats container row">                
                    <h4 class="pokeAtaque col-6">Ataque: ${p.ataque}</h3>
                    <h4 class="pokeDefensa col-6">Defensa: ${p.defensa}</h3>
                    <h4 class="pokeAtaque especial col-6">*Ataque Especial: ${p.ataqueEspecial}</h3>
                    <h4 class="pokeDefensa especial col-6">*Defensa Especial: ${p.defensaEspecial}</h3>
                    </div>
                </div>`);
            });
        }
    });

}
