"use client";

import Image from "next/image";

const Loader = () => {
  return (
    <Image
      src="/assets/icons/loader.svg"
      alt="loading..."
      width={200}
      height={200}
    />
  );
};

export default Loader;
