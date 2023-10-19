import { Web3Storage } from "web3.storage";

const getClient = () => {
  const { public: env } = useRuntimeConfig();
  return new Web3Storage({ token: env.web3StorageToken });
};

export const storeFile = async (file: File) => {
  const client = getClient();
  return await client.put([file], {
    name: file.name,
    maxRetries: 3,
    wrapWithDirectory: false,
  });
};
