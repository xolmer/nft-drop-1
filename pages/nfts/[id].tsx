import React, { useState } from 'react';

import { useMetamask, useWalletConnect, useAddress, useDisconnect } from '@thirdweb-dev/react';
import { connect } from 'http2';

type Props = {};

const NFTDropPage = (props: Props) => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const disconnect = useDisconnect();

  //Tailwind Modal
  const [showModal, setShowModal] = useState(false);

  address && console.log('address', address);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="lg:col-span-4 bg-gradient-to-br from-red-700 to-purple-600 ">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-red-700 p-2 rounded-xl">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://picsum.photos/seed/picsum/300/"
              alt="lorem pixum"
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">NFT Drops</h1>
            <h2 className="text-xl text-gray-300">A Collection of NFTs</h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            Xolmer <span className="font-extrabold text-purple-900"> NFT Drop </span>
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
            src="https://picsum.photos/seed/picsum/300/"
            alt="lorem pixum"
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">Xolmer NFT Club Drop</h1>

          <p className="pt-2 text-xl text-purple-800">12 / 21 NFT's claimed</p>
        </div>
        {/* Mint Button*/}
        <button className="mt-10 h-16 w-full bg-gradient-to-tr from-blue-700 to-purple-600 text-white rounded-xl font-bold">
          Mint NFT (0.05 ETH)
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
