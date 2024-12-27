import { FloatButton } from "antd";
import Navbar from "../componentes/Navbar/Navbar";
import Footer from "../componentes/Footer/Footer";
import { Card } from "antd";

const { Meta } = Card;

function MasVendido() {
  return (
    <div className="App">
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Card
          hoverable
          style={{
            width: 240,
            height: 260,
            borderRadius: 15,
            padding: 5,
          }}
          cover={<img alt="example" src="Designer.jpeg" />}
        >
          <Meta title="Camiseta simple blanca" description="25€" />
        </Card>
      </div>
      <Footer />
      <FloatButton.BackTop />
    </div>
  );
}

export default MasVendido;
