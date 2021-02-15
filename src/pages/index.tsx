import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Audiobooks from '../api/audiobooks';

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



interface HomeProps {
  title?: string;
  data?: any;
}

const Home: React.FC<HomeProps> = ({
  title = 'Loudbook',
  data,
}) => {  
  const [ searchValue, setSearchValue ] = useState(null);

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      setSearchValue(event.currentTarget.value);
      Audiobooks.SearchAll(searchValue);
    }
  }
  const locale = 'es-MX';
  console.log(data);
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
  console.log(parsedData);
  return (
    <main>
      <header>
        <h1>{title}</h1>
        <Link href='/createAudiobook' passHref>
          <a>Create book</a>
        </Link>
      </header>
      <section>
        <input 
          onKeyDown={handleKeyEnter}
          type="text"
          placeholder="Type what you wanna search..."
        />
        <button onClick={() => Audiobooks.SearchAll(searchValue)}>Search</button>  
      </section>
      <section>
        <div>
          <button onClick={() => Audiobooks.ListOne(data.items[3])}>Show Book Detail</button>  
        </div>
        <Link href={`/updateAudiobook/${parsedData}`} passHref>
          <a>Update book</a>
        </Link>
        <div>
          <button onClick={() => Audiobooks.DeleteOne(data.items[0])}>Delete Book</button>
        </div>
      </section>

    </main>
  )
}

export default Home;