export class simularPrestamo extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            :host {
                display: block;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                --bg-primary: #1a1a1a;
                --bg-secondary: #2d2d2d;
                --text-primary: #ffffff;
                --text-secondary: #b3b3b3;
                --accent-color: #0f00e1;
                --accent-hover: #010a5a;
                --border-color: #404040;
                --error-color: #2638dc;
                --success-color: #10b981;
                --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                }

                .card {
                background: var(--bg-secondary);
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
                padding: 2rem;
                max-width: 1200px;
                margin: 2rem auto;
                color: var(--text-primary);
                }

                .card-header {
                text-align: center;
                margin-bottom: 2rem;
                border-bottom: 2px solid var(--border-color);
                padding-bottom: 1rem;
                }

                .card-header h2 {
                color: var(--text-primary);
                margin: 0;
                font-size: 2rem;
                font-weight: 600;
                }

                .form-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1.5rem;
                padding: 1rem;
                }

                @media (min-width: 640px) {
                .form-grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .form-group:last-child {
                    grid-column: span 2;
                }
                }

                @media (min-width: 1024px) {
                .form-grid {
                    grid-template-columns: repeat(3, 1fr);
                }

                .form-group:last-child {
                    grid-column: span 3;
                }
                }

                .form-group {
                margin-bottom: 1rem;
                width: 100%;
                }

                .form-label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
                font-weight: 500;
                font-size: 0.95rem;
                }

                .form-control {
                width: 100%;
                padding: 0.75rem;
                background-color: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                font-size: 1rem;
                color: var(--text-primary);
                transition: all 0.3s ease;
                }

                .form-control:focus {
                outline: none;
                border-color: var(--accent-color);
                box-shadow: 0 0 0 3px rgba(0, 34, 225, 0.2);
                }

                .btn-submit {
                background-color: var(--accent-color);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 1rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
                max-width: 200px;
                margin: 2rem auto;
                display: block;
            }
        </style>
        <div class="card">
            <div class="card-header">
                <h2>Simulación de Préstamo</h2>
            </div>
            <form id="formSimularPrestamo">
                <!--Nombre cliente-->
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="nombreCliente">Nombre del Cliente</label>
                        <input type="text" class="form-control" id="nombreCliente" name="nombreCliente" placeholder="Ingrese el nombre del cliente" required>
                    </div>
                    <!--Documento de Identidad-->
                    <div class="form-group">
                        <label class="form-label" for="identidad">Documento de Identidad</label>
                        <input type="number" class="form-control" id="identidad" name="identidad" placeholder="Ingrese documento de identidad" required>
                    </div>
                    <!--Monto del Préstamo-->
                    <div class="form-group">
                        <label class="form-label" for="montoPrestamo">Monto del Préstamo</label>
                        <input type="number" class="form-control" id="montoPrestamo" name="montoPrestamo" placeholder="Especifique el monto del préstamo" required>
                    </div>
                    <!--Tasa de Interés Anual(%)-->
                    <div class="form-group">
                        <label class="form-label" for="tasaInteres">Tasa de Interés Anual(%)</label>
                        <input type="number" class="form-control" id="tasaInteres" name="tasaInteres" placeholder="Especifique Tasa de Interés Anual(%)" required>
                    </div>
                    <!--Plazo (Meses)-->
                    <div class="form-group">
                        <label class="form-label" for="plazoMeses">Plazo (Meses)</label>
                        <input type="number" class="form-control" id="plazoMeses" name="plazoMeses" placeholder="Especifique el plazo en meses" required>
                    </div>
                    <!--Tipo de Amortización-->
                    <div class="form-group">
                        <label for="nombrePiloto1" class="form-label">Tipo de Amortización</label>
                        <select class="form-control" name="nombrePiloto1" required>
                            <option value="">Seleccionar tipo de amortización</option>
                            <option value="">Francés</option>
                            <option value="">Americana</option>
                        </select>
                    </div>
                <!--Evento para calcular la tabla de amortización-->
                <button id="btnRegistrar" type="submit" class="btn-submit">
                   Calcular
                </button>
            </form>
        </div>
        `;
    }
}

customElements.define("simular-prestamo", simularPrestamo)