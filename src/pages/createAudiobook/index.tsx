import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import Audiobooks from '../../api/audiobooks';

interface CreateAudiobookProps {
  
}

const CreateAudiobook: React.FC<CreateAudiobookProps> = ({
  
}) => {
  const formRef = useRef(null);
  const buildAudiobook = () => {
    let audiobook = {};
    const locale = 'es-MX';
    for (const key in formRef.current) {
      if (Object.prototype.hasOwnProperty.call(formRef.current, key)) {
        const newKey = formRef.current && formRef.current[key].name;
        const value = formRef.current && formRef.current[key].value;
        audiobook = Object.assign(audiobook, {
          [newKey]: Object.assign({}, {
            [locale]: value
          })
        })
        delete audiobook['undefined'];
      }
    }
    audiobook = Object.assign({}, {
      'fields': audiobook
    })
    console.log(audiobook);
    const body = JSON.stringify(audiobook);
    Audiobooks.CreateOne(body);
  }

  return (
    <div>
      <form action="" ref={formRef}>
        <label htmlFor="">
          <span>Title</span>
          <input type="text" name="title" id=""/>
        </label>
        <label htmlFor="">
          <span>Original</span>
          <input type="checkbox" name="is_original" id=""/>
        </label>
        <label htmlFor="">
          <span>Street Date</span>
          <input type="text" name="street_date" id=""/>
        </label>
        <label htmlFor="">
          <span>Cost Per Play</span>
          <input type="number" name="cost_per_play" id=""/>
        </label>
        <label htmlFor="">
          <span>Authors</span>
          <input type="textarea" name="authors" id=""/>
        </label>
        <label htmlFor="">
          <span>Narrators</span>
          <input type="textarea" name="narrators" id=""/>
        </label>
        <label htmlFor="">
          <span>Duration</span>
          <input type="number" name="duration" id=""/>
        </label>
        <label htmlFor="">
          <span>Cover</span>
          <input type="url" name="cover" id=""/>
        </label>
      </form>
      <div>
        <button onClick={() => buildAudiobook()}>Add Book</button>
      </div>
    </div>
  )
}

export default CreateAudiobook;