import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './header.css';
import './content.css';
import './article.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = url => window.open(url);
  console.log({ photos });
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            // llamar a la api de unplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID 9or8rL6V5TB_aHq9E7faPw_oMEySjo2AgpR6Q7-k-KE'
              }
            });
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
          <article key={photo.id} onClick={() => open(photo.links.html)}>
            <img src={photo.urls.regular} alt={photo.description}/>
            <p>{[photo.description, photo.alt_description].join(' - ')}</p>
          </article>)}
        </div>
      </div>
    </div>
  );
};

export default App;

