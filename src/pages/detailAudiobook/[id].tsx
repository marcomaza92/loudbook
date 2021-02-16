import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Audiobooks from '../../api/audiobooks';
import { parseData } from '../../utils/helpers';

export const getStaticProps: GetStaticProps = async ({
  params: {
    id
  }
}) => {
  const data = await Audiobooks.ListOne(id);
  return {
    props: {
      data
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await Audiobooks.ListAll();
  const parsedData = data && parseData(data);
  const paths = parsedData.map((item) => ({
    params: { id: item.id }
  }))
  return {
    paths,
    fallback: true
  };
}

interface DetailAudiobookProps {
  data?: any;
}

const DetailAudiobook: React.FC<DetailAudiobookProps> = ({
  data
}) => {
  const parsedData = data && parseData(data)[0];
  console.log(parsedData);
  return (
    <div>
      <h1>{data && parsedData.id}</h1>
    </div>
  )
}

export default DetailAudiobook;