import { readEntries } from './data';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Entry() {
  const entry = readEntries();

  const listOfEntries = entry.map((item) => {
    return (
      <li key={item.entryId}>
        <img src={item.photoUrl} />
        <h3>{item.title}</h3>
        <Link to={`/details/${item.entryId}`}>
          <FaPencilAlt />
        </Link>
        <p>{item.notes}</p>
      </li>
    );
  });

  return <>{listOfEntries}</>;
}
