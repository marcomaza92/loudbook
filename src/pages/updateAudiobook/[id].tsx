import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: '0',
        }
      }
    ],
    fallback: true
  };
}

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  return {};
} */

interface UpdateAudiobookProps {
  id?: string;
  data?: any;
}

const UpdateAudiobook: React.FC<UpdateAudiobookProps> = ({
  
}) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default UpdateAudiobook;