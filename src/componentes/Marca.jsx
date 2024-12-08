import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Marca.css';

const Marca = ({ name, origin, image, link, about }) => {
  return (
    <Link to={link} className="clothing-card">
      <div className="card">
        <img src={image} alt={name} />
        <div>
          <h1>{name}</h1>
          <h2>{origin}</h2>
          <h3>{about}</h3>
        </div>
      </div>
    </Link>
  );
};

Marca.propTypes = {
  name: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

export default Marca;
