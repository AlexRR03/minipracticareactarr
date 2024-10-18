import React, { Component } from 'react';
import axios from 'axios'
export default class BuscadorJugadores extends Component {
    selectEquipo = React.createRef();
    cajaNombre = React.createRef();
    state = {
        listaEquipos: [],
        listaJugadores: []
    }

    loadEquipos = () => {
        let url = "https://apiejemplos.azurewebsites.net/"
        let request = "api/Equipos"
        axios.get(url + request).then(response => {
            //console.log(response)
            this.setState({
                listaEquipos: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadEquipos();
    }

    buscarJugadoresEquipos = (e) => {
        e.preventDefault()
        let idEquipo = this.selectEquipo.current.value;
        let url = "https://apiejemplos.azurewebsites.net/api/Jugadores/JugadoresEquipos/" + idEquipo
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                listaJugadores: response.data
            })
        })
    }

    buscarJugadorNombre = (e) => {
        e.preventDefault();
        let nombreJugador = this.cajaNombre.current.value;
        let url = "https://apiejemplos.azurewebsites.net/"
        let request = "api/Jugadores/FindJugadores/" + nombreJugador
        let listaJugAux = [];
        axios.get(url + request).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                listaJugAux.push(response.data[i])
                this.setState({
                    listaJugadores: listaJugAux
                })
            }
        })
    }
    render() {
        return (
            <div>
                {console.log(this.state.listaJugadores)}
                <h1>Buscador jugadores</h1>
                <form onSubmit={this.buscarJugadorNombre}>
                    <label>Introduce un nombre:</label>
                    <input type="text" ref={this.cajaNombre} />
                    <button>Buscar nombre de Jugador</button>
                </form>
                <form onSubmit={this.buscarJugadoresEquipos}>
                    <label>Seleccionar un equipo:</label>
                    <select ref={this.selectEquipo}>
                        {this.state.listaEquipos && (
                            this.state.listaEquipos.map((equipo, index) => {
                                return (<option value={equipo.idEquipo} key={index}>{equipo.nombre}</option>)
                            })
                        )
                        }
                    </select>
                    <button>Buscar Jugadores</button>
                </form>
                {
                    this.state.listaJugadores.length != 0 &&
                    (

                        <table>
                            <thead>
                                <tr>
                                    <td>Imagen</td>
                                    <td>Nombre</td>
                                    <td>Posicion</td>
                                    <td>Pais</td>
                                    <td>Fecha de nacimiento</td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.listaJugadores.map((jugador, index) => {
                                    return(
                                    <tr key={index}><td><img style={{ width: "150px", height: "150px" }} src={jugador.imagen} /></td>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.posicion}</td>
                                        <td>{jugador.pais}</td>
                                        <td>{jugador.fechaNacimiento}</td>
                                    </tr>)
                                })
                            }                               


                            </tbody>
                        </table>)

                }

            </div>
        )
    }
}
