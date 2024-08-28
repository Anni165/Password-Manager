import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black">
      {/* <ul className='items-center justify-between flex pr-10 pl-10'>
            <li className='logo font-bold text-white'>&lt;PassMan/&gt;</li>
            <li><img src="https://pngimg.com/uploads/github/github_PNG23.png" className='invert' width={150} height={150} alt="" /></li>
        </ul> */}
      <div className="items-center justify-around flex gap-80">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-300">&lt;</span>
            Pass
          <span className="text-green-300">Man <img className="inline pb-2" width={35} src="/avatar.png" alt="" /> /&gt;</span>
        </div>
        <div>
          <a href="https://github.com/Anni165">
            <img src="https://pngimg.com/uploads/github/github_PNG23.png" className='invert' width={150} height={100} alt="" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
