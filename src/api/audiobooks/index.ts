import Common from '../common';
import Data from '../data';

const FetchURLs = {
  WithoutParams: `${Common.BaseURL}${Common.DataURL}`,
  WithParams: `${Common.BaseURL}${Common.DataURL}${Common.ParamsURL}`
}

const CreateOne = async (audiobook) => {
  console.log(audiobook);
  try {
    const response = await fetch(FetchURLs.WithoutParams, {
      method: 'POST',
      redirect: 'follow',
      headers: Common.Headers,
      body: audiobook
    })
    const data = await response.json();
    console.log(data);
    return data;  
  } catch (error) {
    console.log(error);
  }
};

const UpdateOne = async (audiobook) => {
  const headers = Object.assign(Common.Headers, {
    'X-Contentful-Version': audiobook.sys.version
  });
  const url = `${FetchURLs.WithoutParams}/${audiobook.sys.id}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      redirect: 'follow',
      headers: headers,
      body: JSON.stringify(Data.AudiobookUpdateData)
    })
    const data = await response.json();
    return data;  
  } catch (error) {
    console.log(error);
  }
};

const DeleteOne = async (audiobook) => {
  console.log(audiobook)
  const url = `${FetchURLs.WithoutParams}/${audiobook.sys.id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      redirect: 'follow',
      headers: Common.Headers,
      body: JSON.stringify(Data.AudiobookDeleteData)
    })
    const data = await response.json();
    return data;  
  } catch (error) {
    console.log(error);
  }
};

const ListOne = async (id) => {
  const url = `${FetchURLs.WithParams}&sys.id=${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: Common.Headers
    })
    const data = await response.json();
    return data;  
  } catch (error) {
    console.log(error);
  }
};

const ListAll = async () => {
  try {
    const response = await fetch(FetchURLs.WithParams, {
      method: 'GET',
      redirect: 'follow',
      headers: Common.Headers
    })
    const data = await response.json();
    return data;  
  } catch (error) {
    console.log(error);
  }
};

const SearchAll = async (search) => {
  const url = `${FetchURLs.WithParams}&query=${search}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: Common.Headers
    })
    const data = await response.json();
    return data;  
  } catch (error) {
    console.log(error);
  }
};

const Audiobooks = {
  ListAll,
  CreateOne,
  UpdateOne,
  ListOne,
  SearchAll,
  DeleteOne
}

export default Audiobooks;