import { FormEvent } from 'react';
import { useState } from 'react';
import { addEntry } from './data';
import { useParams, Link } from 'react-router-dom';
import { readEntry, type Entry } from './data';
import { useEffect } from 'react';

export function EntryForm() {
  const [title, setTitle] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const { entryId } = useParams();
  const isEditing = entryId && entryId !== 'new';
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeEntry, setActiveEntry] = useState<Entry>();

  useEffect(() => {
    async function work(entryId: number) {
      setIsLoading(true);
      try {
        const entry = await readEntry(entryId);
        if (!entry) throw new Error(`Entry with ID ${entryId} not found`);
        setActiveEntry(entry);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) work(+entryId);
  }, [entryId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An Error!</div>;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    addEntry({ title, photoUrl, notes });
    event.currentTarget.reset();
    console.log('title:', title);
    console.log('photoUrl:', photoUrl);
    console.log('notes:', notes);
  }

  return (
    <div className="container" data-view="entry-form">
      <div className="row">
        <div className="column-full d-flex justify-between">
          <h1 id="formH1">New Entry</h1>
        </div>
      </div>
      <form id="entryForm" onSubmit={handleSubmit}>
        <div className="row margin-bottom-1">
          <div className="column-half">
            <img
              className="input-b-radius form-image"
              id="formImage"
              src="../images/placeholder-image-square.jpg"
              alt="image of entry image"
            />
          </div>
          <div className="column-half">
            <label className="margin-bottom-1 d-block">
              Title
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formTitle"
                name="formTitle"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={activeEntry?.title || title}
              />
            </label>
            <label className="margin-bottom-1 d-block">
              Photo URL
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formURL"
                name="formURL"
                onChange={(e) => setPhotoUrl(e.target.value)}
                defaultValue={activeEntry?.photoUrl ?? photoUrl}
              />
            </label>
          </div>
        </div>
        <div className="row margin-bottom-1">
          <div className="column-full">
            <label className="margin-bottom-1 d-block">
              Notes
              <textarea
                required
                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                name="formNotes"
                id="formNotes"
                onChange={(e) => setNotes(e.target.value)}
                defaultValue={activeEntry?.notes ?? notes}
                // cols="30"
                // rows="10"
              ></textarea>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column-full d-flex justify-between">
            <button
              className="invisible delete-entry-button"
              type="button"
              id="deleteEntry">
              Delete Entry
            </button>
            <Link to="/">
              <button className="input-b-radius text-padding purple-background white-text">
                SAVE
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
