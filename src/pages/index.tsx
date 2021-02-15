import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import AudioBooks from '../api/audiobooks';

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await AudioBooks.ListAll();
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
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <button onClick={() => AudioBooks.CreateOne()}>Add Book</button>
      </div>
      <div>
        <button onClick={() => AudioBooks.UpdateOne(data.items[0])}>Update Book</button>  
      </div>
      <div>
        <button onClick={() => AudioBooks.ListOne(data.items[3])}>Show One Book</button>  
      </div>
      <div>
        <p>{searchValue}</p>
        <input onChange={(event) => setSearchValue(event.target.value)} type="text" placeholder="Type what you wanna search..."/>
        <button onClick={() => AudioBooks.SearchAll(searchValue)}>Search</button>  
      </div>
      <div>
        <button onClick={() => AudioBooks.DeleteOne(data.items[0])}>Delete Book</button>  
      </div>
    </div>
  )
}

export default Home;