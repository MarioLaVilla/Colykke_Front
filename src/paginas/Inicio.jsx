import React, { useEffect, useState } from "react";
import { FloatButton } from "antd";
import Navbar from "../componentes/Navbar/Navbar";
import Footer from "../componentes/Footer/Footer";
import Carousel from "../componentes/Carousel/Carousel"; // Importamos el nuevo componente
import SearchBar from "../componentes/SearchBar/SearchBar"; // Importamos el componente de búsqueda

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosResponse, marcasResponse] = await Promise.all([
          fetch("http://localhost:8080/colykke/producto").then((res) =>
            res.json()
          ),
          fetch("http://localhost:8080/colykke/vendedor").then((res) =>
            res.json()
          ),
        ]);

        setProductos(productosResponse.data);
        setMarcas(marcasResponse.data);

        // Evita manipular el scroll manualmente aquí
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    console.log("Buscar:", query);
    // Aquí podrías implementar la lógica para filtrar productos o marcas
  };

  return (
    <div className="app-container">
        <SearchBar
          onSearch={handleSearch}
        />
      <Navbar className="navegacion" />
      <div className="contenido-principal">
        <Carousel productos={productos} marcas={marcas} />
        <div className="trabajar">
          <h1>¿Quieres trabajar con nosotros?</h1>
          <p>
            Escríbenos un email a{" "}
            <a href="mailto:colykke@gmail.com">colykke@gmail.com</a> con los
            siguientes datos:
          </p>
          <ul>
            <li>Logo</li>
            <li>Descripción de la empresa</li>
            <li>Ciudad de origen</li>
          </ul>
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloremque
        consequuntur repudiandae? Dolore ipsum dignissimos aperiam
        necessitatibus illum provident vero voluptatum totam expedita tempore
        beatae laudantium alias, culpa repellendus cupiditate veniam, numquam
        repellat. Aspernatur ipsam dolorum tempore sequi. Ad velit consequuntur
        architecto maxime, ut officiis labore maiores eius voluptas quidem,
        reprehenderit ex. Ea id perspiciatis minus quam fugiat? Quam ducimus a
        dicta nulla praesentium magnam sed soluta perferendis in sapiente vitae
        error alias, consequatur iure veniam dolorum reiciendis doloremque ullam
        quasi aut laborum veritatis. Asperiores officia praesentium accusamus
        quisquam molestias quos, repudiandae obcaecati culpa et, ut odio
        cupiditate cumque ab, vel dolor similique inventore aspernatur velit
        deserunt ducimus porro iure rem dignissimos. Consequuntur, delectus.
        Quisquam maxime veritatis omnis similique mollitia pariatur, inventore,
        cumque et officia molestiae eligendi odio velit! Sint, aspernatur
        asperiores commodi magnam placeat repellendus ex nihil quae enim a amet
        ab provident itaque praesentium reiciendis labore cupiditate dolorem sit
        dolor fuga rem architecto! Nihil natus neque autem sequi saepe hic
        architecto unde corrupti, deleniti, eius officia accusantium reiciendis
        in labore ut distinctio cum asperiores quos. Cum temporibus eligendi,
        amet incidunt odio possimus officiis odit exercitationem! Obcaecati,
        dolorem explicabo doloremque beatae magni, eum repellat temporibus sequi
        debitis optio, tenetur possimus laborum quos quia ducimus suscipit.
        Nobis earum odio ad possimus, voluptas a dolores quo ipsam ab
        consequatur eveniet ullam vitae explicabo. Dignissimos accusamus
        laudantium quod placeat neque odio beatae, quas ipsam reprehenderit
        obcaecati officiis magnam pariatur perspiciatis soluta earum quibusdam
        quos? Iste natus minima qui incidunt! Voluptatum voluptas nemo soluta
        voluptatibus voluptatem earum, maxime accusamus labore eligendi ducimus
        odio vel ad, illo facilis nobis consequatur necessitatibus, dolores in
        eos? Sint, obcaecati itaque. Eius neque, excepturi doloremque modi atque
        consequatur nam suscipit molestias culpa ipsa iure nisi quia porro
        assumenda et. Cupiditate ipsam reprehenderit ad unde, officia facilis
        expedita quam maiores earum quo blanditiis odio cum molestias rem iste
        tenetur consequuntur autem explicabo animi. Doloribus molestias totam
        adipisci modi quasi perspiciatis pariatur soluta natus dolores aliquam
        officia maxime aut nam magni autem a atque, dolorem quis corporis
        officiis recusandae ipsa. Est iusto quam nam. Facilis quam hic nam
        dolores mollitia, est nulla tenetur adipisci maiores quaerat ipsa earum
        laudantium quod reprehenderit non, numquam officiis iste ipsam nesciunt
        dolore aut delectus inventore. Optio similique voluptatem tempore, natus
        dignissimos asperiores. Id non, dolorum natus odit cum expedita dolor
        eaque ea consectetur nulla, sint maxime dolorem blanditiis illo
        voluptates laborum perspiciatis maiores exercitationem ipsa neque
        molestias voluptatum. Iure voluptatem dolorum non porro? Corporis
        dignissimos porro sed cupiditate eos. Harum deserunt nemo adipisci,
        dolores aliquid illum eius omnis corrupti exercitationem iste ea
        delectus doloribus explicabo alias, excepturi quis labore corporis
        necessitatibus ex? Eaque autem est beatae nostrum totam, fuga enim.
        Illum ratione debitis vel quae aspernatur voluptas, quod provident
        quibusdam repellat magnam aliquid similique, nesciunt eligendi deleniti
        necessitatibus explicabo molestias quos distinctio odit aperiam
        repudiandae quam excepturi voluptatibus animi. Nesciunt soluta
        consequuntur facilis repellendus recusandae vero assumenda, eligendi
        vitae aspernatur pariatur architecto, dolore voluptatem sapiente
        molestias aliquid animi qui ratione tenetur ad fugiat quo. Vel earum,
        assumenda aut alias incidunt culpa in et atque corporis obcaecati ullam
        quas eius qui fugiat, consequuntur, veniam reiciendis. Perspiciatis
        molestiae et nihil unde est ab, alias animi ad possimus hic, voluptates
        molestias ipsum itaque aut exercitationem ut sit in. Nihil provident
        harum unde, aut fugit debitis possimus dignissimos nesciunt facilis
        dolores officiis velit voluptatem quaerat incidunt nemo itaque
        architecto ab impedit magni. Alias, a. Commodi suscipit dolor,
        necessitatibus quos odio ad itaque delectus veniam officia ducimus minus
        harum asperiores fugiat hic minima ipsa voluptates exercitationem eos
        explicabo! Nihil enim molestiae voluptatem dolorem iure incidunt
        sapiente? Maxime suscipit iure, atque id commodi vitae provident culpa
        quo dignissimos assumenda nisi voluptate aliquid vel. Facere hic
        eligendi vitae dolorem possimus voluptatibus vero! Eius voluptatibus
        unde quis id quidem velit atque recusandae qui est assumenda voluptatem
        temporibus debitis ab eaque, cum ex sed quisquam placeat eligendi. Vitae
        magni aliquam neque, perferendis non sint repellat cum voluptas, error
        facere, vero minima porro. Quam velit expedita adipisci accusamus vitae
        facere dignissimos sunt nemo corrupti nobis at tenetur, maiores nam
        reprehenderit odit fugit sequi, sint sit rem architecto laudantium!
        Tempore atque nostrum maxime rem. Harum error ex illum et qui veritatis
        blanditiis neque alias atque quod amet, cumque reprehenderit labore!
        Reprehenderit labore numquam quaerat atque eum similique optio molestiae
        eos corporis praesentium exercitationem, esse asperiores commodi animi
        fugiat illum nesciunt aliquid, libero, rerum nostrum minima ipsam?
        Voluptates quo mollitia fugit praesentium beatae, nulla libero similique
        voluptatem distinctio soluta eligendi placeat ipsam provident labore
        voluptatibus hic atque nesciunt, earum quos aliquid ipsum quasi
        excepturi? Harum accusamus optio quisquam, ipsum corrupti fugiat unde
        eaque ullam laborum asperiores quam fugit! Quasi nulla explicabo
        aspernatur vero, eos hic veniam reprehenderit nobis adipisci excepturi
        maiores quia debitis atque? Eveniet repudiandae doloribus quod
        laudantium earum ducimus quidem quas facilis voluptate, totam natus
        recusandae molestiae itaque doloremque blanditiis in perspiciatis, harum
        illo. Exercitationem odit, vel iusto cum voluptatibus animi, soluta
        distinctio molestias accusamus repellat nulla ab non corrupti sapiente
        aut repellendus tempore quibusdam fuga sequi doloremque? Voluptatibus
        vero eum numquam itaque voluptate nemo veniam neque pariatur. Dolore
        minima quibusdam voluptatem at quod sit nulla aperiam saepe neque
        consequatur pariatur labore eos similique tempore illum, optio est alias
        vel, dolores laboriosam dolorem quis recusandae. Laudantium quo ipsa ad,
        doloribus totam assumenda repellendus cum adipisci alias, voluptate sit
        saepe ut recusandae consectetur soluta enim quibusdam minus aut commodi
        illum amet iste voluptatem! Deserunt quis amet sed asperiores sequi
        cupiditate iste corrupti doloremque rerum accusantium quidem tempora,
        perferendis beatae, ipsum praesentium expedita? Placeat, exercitationem
        odit eveniet in numquam quas architecto doloribus dignissimos itaque
        obcaecati laborum nam eaque voluptatum modi earum deleniti! Tempore
        officia corporis quae facere. Consectetur aliquid officia aut ipsa
        commodi, vitae amet. Autem illo voluptate odit quos laborum? Magnam, vel
        corrupti atque dolores sit ipsa! Nobis id porro sunt, dolore error
        impedit obcaecati alias tempore tempora illo nesciunt similique dolor
        ad! Nam nostrum odio, laboriosam quidem officiis, sunt officia sint
        laborum voluptas ullam quisquam! Debitis dolor libero enim repellendus
        ea, aliquam quasi fugit?{" "}
      </div>
      <Footer className="pie" />
      <FloatButton.BackTop className="back-to-top-btn" />
    </div>
  );
}

export default Inicio;
