import Swal from 'sweetalert2';
import { postUsuarios, getUsuarios } from '../Apis/userApis.js';

export class registroUser extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`
        <style>
            .registro-container {
                background-color: #1c1c1c;
                border-radius: 10px;
                padding: 30px;
                max-width: 400px;
                margin: 100px auto;
                box-shadow: 0 0 30px rgba(0, 47, 255, 0.1);
                border: 1px solid #333333;
            }

            h2 {
                color: #ffffff;
                text-align: center;
                font-size: 28px;
                margin-bottom: 30px;
                text-transform: uppercase;
                letter-spacing: 2px;
                text-shadow: 2px 2px 4px rgba(0, 7, 75, 0.89);
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            label {
                color: #ffffff;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
                display: block;
            }

            input {
                width: 100%;
                padding: 12px;
                background-color: #2d2d2d;
                border: 2px solid #333;
                border-radius: 5px;
                color: #ffffff;
                font-size: 16px;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }

            input:focus {
                outline: none;
                border-color:rgba(0, 7, 75, 0.89);
                box-shadow: 0 0 10px rgba(0, 47, 255, 0.1);
            }

            button {
                background: linear-gradient(45deg,rgba(0, 7, 75, 0.89),rgba(0, 47, 255, 0.1));
                color: white;
                padding: 15px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                text-transform: uppercase;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            button:before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: rgba(255, 255, 255, 0.1);
                transform: rotate(45deg);
                transition: 0.5s;
            }

            button:hover:before {
                left: 100%;
            }

            button:hover {
                transform: translateY(-3px);
                box-shadow: 0 7px 20px rgba(0, 47, 255, 0.1);
            }

            button:active {
                transform: translateY(-1px);
            }
        </style>
        <div class="registro-container">
            <h2>Registro</h2>
            <form id="signupForm">
                <div>
                    <label for="username">Nombre:</label>
                    <input type="text" id="username" name="usuario" required>
                </div>
                <div>
                    <label for="identidad">Documento de Identidad:</label>
                    <input type="number" id="identidad" name="identidad" required>
                </div>
                <button id="btnRegistrarse" type="submit">Registrar</button>
            </form>
        </div>
        `;
        //Manejo de eventos al registrar el usuario
        this.addEventListeners();
    }

    /**
     * Manejo de eventos para registrar el usuario
     */
    addEventListeners() {
        this.querySelector('#btnRegistrarse').addEventListener('click', async (event) => {
            event.preventDefault(); // Evita que el botón active el envío automático del formulario
    
            //Tomar los valores ingresados por el usuario en el formulario
            const username = this.querySelector('#username').value.toUpperCase();
            const identidad = this.querySelector('#identidad').value;
    
            //Comprobar si en los campos hay información
            if (!username || !identidad) {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Complete todos los campos!",
                });
                return;
            }

            try {
                // Obtener lista de usuarios para verificar duplicados
                const users = await getUsuarios();

                // Verificar si el usuario ya está registrado
                const userExists = users.some(user => user.usuario.toUpperCase() === username);

                //Si el usuario está disponible
                if (userExists) {
                    Swal.fire({
                        icon: "error",
                        title: "Usuario en uso",
                        text: "Usuario ya registrado. Intenta con otro.",
                    });
                    return;
                }

                // Si el usuario no existe, proceder con el registro
                const formData = new FormData(this.querySelector('#signupForm'));
                const datos = Object.fromEntries(formData.entries());

                //Envía los datos de los usuarios
                const response = await postUsuarios(datos);

                if (!response.ok) {
                    throw new Error(`Error en el registro: ${response.status} - ${response.statusText}`);
                }

                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "¡Usuario registrado correctamente!",
                });

                // Limpiar formulario después de registrar
                this.querySelector('#signupForm').reset();

            } catch (error) {
                console.error("Error en el registro:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Error en el registro",
                    text: "Hubo un problema al registrar el usuario. Inténtelo de nuevo.",
                });
            }
        });
    }
    
}
customElements.define("registro-user", registroUser);