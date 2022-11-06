import React from 'react';
import { BsTwitter, BsTelegram, BsInstagram, BsFacebook, BsYoutube } from 'react-icons/bs';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex justify-center items-center mt-auto">
      <a href="" target="_blank" rel="noreferrer">
        <BsTwitter className="text-3xl text-blue-400" />
      </a>
      <a href="" target="_blank" rel="noreferrer">
        <BsTelegram className="text-3xl text-blue-400 ml-5" />
      </a>
      <a href="" target="_blank" rel="noreferrer">
        <BsInstagram className="text-3xl text-blue-400 ml-5" />
      </a>
      <a href="" target="_blank" rel="noreferrer">
        <BsFacebook className="text-3xl text-blue-400 ml-5" />
      </a>
      <a href="" target="_blank" rel="noreferrer">
        <BsYoutube className="text-3xl text-blue-400 ml-5" />
      </a>

      {/* All right reserved */}
      <p className="text-sm text-gray-400 ml-5">NFT Drop 2022 All right reserved</p>
    </footer>
  );
};

export default Footer;
