import { readEntries } from './data';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Entry() {
  const entry = readEntries();

  const listOfEntries = entry.map((item) => {
    return (
      <li key={item.entryId}>
        <div className="row">
          <div className="column-half">
            <img src={item.photoUrl} className="input-b-radius form-image" />
          </div>
          <div className="column-half">
            <div className="row">
              <div className="column-full d-flex justify-between">
                <h3>{item.title}</h3>
                <Link to={`/details/${item.entryId}`}>
                  <FaPencilAlt />
                </Link>
              </div>
            </div>
            <p>{item.notes}</p>
          </div>
        </div>
      </li>
    );
  });

  return <>{listOfEntries}</>;
}
