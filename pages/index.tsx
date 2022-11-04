import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="NFT Drop, Blockchain,ERC721" />
        <meta name="author" content="Kaveh Aidivandi" />
      </Head>
      <h1 className="text-red-800 text-4xl">Welcome to the NFT Drop</h1>
    </div>
  );
};

export default Home;
