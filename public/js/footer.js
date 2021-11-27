const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `

<!-- Footer -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
<footer class="page-footer font-small blue pt-4 text-white bg-primary mt-5">
    <div class="container-fluid text-center text-md-left">
      <div class="row">
        <div class="col-md-6 mt-md-0 mt-3">
          <img src="images/logo.png" alt="Logo da Dedetizadora OutSetos">
        </div>
        <hr class="clearfix w-100 d-md-none pb-3">
        <div class="col-md-3 mb-md-0 mb-3 ">
  
          <!-- Contatos -->
          <h4 >Contatos</h4>
          <ul class="list-unstyled">
            <li>(61)999999999</li>
            <li>(61)999999999</li>
          </ul>
        </div>
        <div class="col-md-3 mb-md-0 mb-3">
          <h4 class="text-uppercase">Onde Estamos</h4>
          <h5>Rua dos bobos, Nº 0 <br>
          Brasília - DF </h5>

        </div>
  
      </div>
  
    </div>
  
    <!-- Copyright -->
    <div class="footer-copyright text-center py-3 text-white">© 2021 Copyright: Daniel Aguiar & Igor Silva
    </div>
    <!-- Copyright -->
  
  </footer>
  <!-- Footer -->
`

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(footerTemplate.content);
    }
}

customElements.define('footer-component', Footer);