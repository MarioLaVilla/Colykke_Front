import { FloatButton } from 'antd';
import Navbar from '../componentes/Navbar/Navbar';
import Footer from '../componentes/Footer/Footer';
import { Card } from "antd";

function Novedades() {

  return (
    <div className="App">
      <Navbar />
      <Footer />
      <FloatButton.BackTop />
    </div>
  );
}

export default Novedades
