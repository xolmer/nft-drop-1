import React, { useEffect, useState } from 'react';

import {
  useMetamask,
  useWalletConnect,
  useAddress,
  useDisconnect,
  useContract,
} from '@thirdweb-dev/react';
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';

type Props = {
  collection: Collection;
};

const NFTDropPage = ({ collection }: Props) => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const disconnect = useDisconnect();

  // Get the contract
  const type = collection.contractType.type === 'nft-drop' ? 'nft-drop' : 'signature-drop';
  let nftDrop = useContract(collection.address, type).contract;

  //States
  const [showModal, setShowModal] = useState(false);
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [unclaimedSupply, setUnclaimedSupply] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [priceInEth, setPriceInEth] = useState<string>();

  const getSupply = async () => {
    setLoading(true);
    if (!nftDrop) return;
    const claimed = await nftDrop.getAllClaimed();
    const unclaimed = await nftDrop.getAllUnclaimed();
    setClaimedSupply(claimed.length);
    setUnclaimedSupply(unclaimed.length);
    setLoading(false);
  };

  const fetchPrice = async () => {
    if (!nftDrop) return;
    const claimCondition = await nftDrop.claimConditions.getAll();
    setPriceInEth(claimCondition[0].currencyMetadata.displayValue);
  };

  const mintNft = async () => {
    if (!nftDrop || !address) return;
    const quantity = 1;

    setLoading(true);

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt;
        const claimedTokenId = tx[0].id;
        const claimedNft = await tx[0].data();

        console.log('receipt', receipt);
        console.log('claimedTokenId', claimedTokenId);
        console.log('claimedNft', claimedNft);
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        getSupply();
        setLoading(false);
      });
  };

  useEffect(() => {
    getSupply();
    fetchPrice();
  }, [nftDrop]);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-red-700 to-purple-600 ">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-red-700 p-2 rounded-xl">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage).url() || 'https://via.placeholder.com/150'}
              alt="lorem pixum"
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">{collection.nftCollectionName}</h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            <Link href="/">
              Xolmer <span className="font-extrabold text-purple-900"> NFT Drop </span>
            </Link>
          </h1>
          {address ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={disconnect}
                className="px-5 py-3 text-sm font-medium text-white bg-gradient-to-br from-orange-600 to-red-700 rounded-lg"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-gradient-to-br from-blue-700 to-purple-600 text-white px-5 py-3 text-sm font-bold lg:px-6 lg:py-3 lg:text-base"
            >
              Connect
            </button>
          )}
        </header>
        <hr className="my-2 border" />
        {/* You are Connected to Mumbai Testnet with address */}
        {address && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-semibold text-gray-600">You are connected with wallet :</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-extrabold text-gray-600">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
        )}
        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 object-cover lg:h-40 "
            src={urlFor(collection.mainImage).url() || 'https://via.placeholder.com/150'}
            alt="lorem pixum"
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">{collection.title}</h1>
          {loading ? (
            <p className="pt-2 text-xl animate-pulse text-purple-800">Loading...</p>
          ) : (
            <p className="pt-2 text-xl text-purple-800">
              {unclaimedSupply > 0
                ? `There are ${unclaimedSupply} NFTs left to claim!`
                : `All NFTs have been claimed!`}{' '}
            </p>
          )}

          {loading && (
            <img className="w-20 object-contain pt-5" src="/assets/Snooker.gif" alt="loading" />
          )}
        </div>
        {/* Mint Button*/}
        <button
          disabled={loading || unclaimedSupply === 0 || !address}
          className="mt-10 h-16 w-full bg-purple-800 text-white rounded-xl font-bold disabled:bg-gray-400"
          onClick={mintNft}
        >
          {loading ? (
            <>Loading...</>
          ) : unclaimedSupply > 0 ? (
            <span className="font-bold">Claim NFT for {priceInEth} MATIC</span>
          ) : (
            <>All NFTs have been claimed!</>
          )}
        </button>
      </div>

      {/* Modal */}
      {showModal &&
        (address ? (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setShowModal(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              {/* Modal */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Connected with {address}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">You are connected with {address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => disconnect()}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Disconnect
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setShowModal(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Connect Wallet
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please connect your wallet to continue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => connectWithMetamask()}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Metamask
                  </button>
                  <button
                    onClick={() => connectWithWalletConnect()}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Wallet Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    contractType->{
      type,
    },
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator->{
      _id,
      name,
      address,
      slug {
        current
      },
    },
  }`;

  const collection = await sanityClient.fetch(query, { id: params?.id });
  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection,
    },
  };
};
