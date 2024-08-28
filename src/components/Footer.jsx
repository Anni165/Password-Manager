import React from "react";

const Footer = () => {
  return (
    <footer>

    <div className="bg-black flex items-center justify-center flex-col fixed bottom-0 w-full">
      <div className="text-2xl mx-3 text-white font-bold">
        <span className="text-green-300">&lt;</span>
        Pass
        <span className="text-green-300">Man <div className="inline-block"><img width={35} src="/avatar.png" alt="" /></div> /&gt;</span>
      </div>
      <div className="text-white">Created with ❤️ by Anni</div>
    </div>
    </footer>
  );
};

export default Footer;
