import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import Audiobooks from '../../api/audiobooks';

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await Audiobooks.ListAll();
  return {
    props: {
      data,
    },
    revalidate: 60
  }
}

/* export const getStaticPaths: GetStaticPaths = async () => {
  return {};
} */

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  return {};
} */

interface CreateAudiobookProps {
  title?: string;
  data?: any;
}

const CreateAudiobook: React.FC<CreateAudiobookProps> = ({
  title = 'Loudbook',
  data,
}) => {  
  const [ searchValue, setSearchValue ] = useState(null);
  const locale = 'es-MX';
  const parsedData = data.items.map((item, index) => {
    const keys = Object.keys(item.fields);
    let newItem = {};
    for (let i = 0; i < keys.length; i++) {
      if (Object.prototype.hasOwnProperty.call(item.fields, keys[i])) {
        const value = item.fields[keys[i]][locale];
        newItem = Object.assign(newItem, {
          [keys[i]]: value
        })
      }
    }
    return newItem;
  });
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <button onClick={() => Audiobooks.CreateOne()}>Add Book</button>
      </div>
      <div>
        <p>{searchValue}</p>
        <input onChange={(event) => setSearchValue(event.target.value)} type="text" placeholder="Type what you wanna search..."/>
        <button onClick={() => Audiobooks.SearchAll(searchValue)}>Search</button>  
      </div>
      <div>
        <button onClick={() => Audiobooks.DeleteOne(data.items[0])}>Delete Book</button>  
      </div>
    </div>
  )
}

export default CreateAudiobook;