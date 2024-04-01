import { Entry } from './Entry';
import { Link } from 'react-router-dom';

export function Entries() {
  return (
    <div className="container" data-view="entries">
      <div className="row">
        <div className="column-full d-flex justify-between align-center">
          <h1>Entries</h1>
          <h3>
            <Link
              id="formLink"
              className="white-text form-link"
              to="/details/new">
              NEW
            </Link>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="column-full">
          <ul className="entry-ul" id="entryUl">
            <Entry />
          </ul>
        </div>
      </div>
    </div>
  );
}
