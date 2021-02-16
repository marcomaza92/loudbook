import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Audiobooks from '../api/audiobooks';
import { parseData } from '../utils/helpers';

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await Audiobooks.ListAll();
  return {
    props: {
      data
    },
    revalidate: 60
  }
}

interface HomeProps {
  title?: string;
  data?: any;
}

const Home: React.FC<HomeProps> = ({
  title = 'Loudbook',
  data,
}) => {  
  const [ searchValue, setSearchValue ] = useState(null);
  const parsedData = parseData(data);
  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      setSearchValue(event.currentTarget.value);
      Audiobooks.SearchAll(searchValue);
    }
  }
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
        <Link href={{
          pathname: `/updateAudiobook/[id]`,
          query: { id: parsedData[3].id }
        }} passHref>
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