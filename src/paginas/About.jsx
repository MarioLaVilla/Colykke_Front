import "./About.css";
import { FloatButton } from "antd";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="About">
      <div className="App">
        <Link to="/" className="back-arrow-ab">
          ←
        </Link>
        <div className="logo-container-ab">
          <img src="logo_sin_fondo.png" alt="Logo" />
        </div>
        <div className="descripcion">
          <h1>¿Qué es COlykke?</h1>
          <p>
            COlykke consiste en un marketplace para pequeñas marcas y
            diseñadores emergentes. A través de COlykke queremos ayudar a
            emprendedores y artistas sin los medios y/o conocimientos necesarios
            para despegar su marca, a la vez que abrimos una puerta a los
            consumidores a encontrar algo único, diferente y producido de manera
            responsable. COlykke es una empresa creada por novatos para novatos,
            pero que saben que juntos pueden cambiar la idea de moda y consumo
            tal y como la conocemos actualmente.
          </p>
          <h2>Misión</h2>
          <p>
            Fomentar el consumo y crecimiento de marcas independientes,
            utilizando nuestra web como catálogo y punto de venta; a la vez que,
            ayudamos a nuestros usuarios a encontrar una gran variedad de
            productos y una forma de pago segura.
          </p>
          <h2>Visión</h2>
          <p>
            Posicionarnos como un punto de venta establecido en la mente del
            público, y así fomentar una nueva manera de consumo que, no solo se
            dirige casi exclusivamente a las grandes marcas de fast fashion,
            sino que al vendedor pequeño y local.
          </p>
          <h2>Valores</h2>
          <p>
            A. Social: Ayudar a otros pequeños emprendedores como nosotros a
            arrancar sus negocios y darles visibilidad. Promover la igualdad de
            oportunidades, y la diversidad.<br></br>
            B. Economía: Impulsar el pequeño comercio.<br></br>
            C. Ambiental: Promover el slow fashion, la producción responsable, y
            la moda sostenible.
          </p>
          <h1>¿Quién puede vender en COlykke?</h1>
          <p>
            Nuestro objetivo principal es brindar visibilidad y oportunidades de
            crecimiento a las pequeñas marcas y emprendimientos que buscan
            expandir su alcance en el mercado. En nuestra plataforma, cualquier
            persona o empresa puede vender sus productos, sin importar su tamaño
            o ubicación geográfica, lo que nos permite fomentar la diversidad y
            la competencia en el mercado.
          </p>
          <h1>¿Por qué usar COlykke?</h1>
          <p>
            En COlykke, nos enfocamos en crear un entorno donde la creatividad y
            la innovación puedan florecer. Al elegir nuestra plataforma, no solo
            estás obteniendo una herramienta para vender tus productos, sino que
            también te estás uniendo a una comunidad de emprendedores y artistas
            que comparten tus valores y objetivos. Nuestra plataforma está
            diseñada para ser fácil de usar, accesible y segura, lo que te
            permite enfocarte en lo que realmente importa: crear y compartir tus
            productos con el mundo. Además, nuestra política de visibilidad y
            oportunidades de crecimiento para pequeñas marcas y emprendimientos
            te da la oportunidad de expandir tu alcance y llegar a un público
            más amplio. Al usar COlykke, estás apoyando una economía más
            circular y sostenible, donde la creatividad y la innovación son
            valoradas y recompensadas. ¡Únete a nosotros y descubre por qué
            COlykke es la plataforma perfecta para ti!
          </p>
        </div>
        <FloatButton.BackTop />
      </div>
    </div>
  );
}

export default About;
