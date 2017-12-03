// @flow
import RNFetchBlob from 'react-native-fetch-blob';

type FetchToFileProps = {
  headers: mixed,
  path: string,
  requestPath: string,
};

type LoadFromFileProps = {
  path: string,
};

export const { dirs } = RNFetchBlob.fs;

export const fetchToFile = ({
  headers,
  path,
  requestPath,
}: FetchToFileProps): Promise<string> =>
  new Promise((resolve, reject) => {
    RNFetchBlob.config({
      path,
    })
      .fetch('GET', requestPath, {
        ...headers,
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

export const loadFromFile = ({ path }: LoadFromFileProps): Promise<string> =>
  new Promise((resolve, reject) => {
    RNFetchBlob.fs
      .readStream(path)
      .then(stream => {
        let data = '';
        stream.open();
        stream.onData(chunk => {
          data += chunk;
        });
        stream.onEnd(() => resolve(data));
      })
      .catch(error => reject(error));
  });
