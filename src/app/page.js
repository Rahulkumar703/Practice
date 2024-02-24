import Image from "next/image";

export default function Home() {
  return (
    <div className="grid place-items-center gap-6 pb-10 h-full">
      <Image src={'/images/code.svg'} width={100} height={100} className="w-full object-contain object-center h-auto md:object-cover md:h-screen -mt-10" alt="home" />
      <h1 className="md:mt-10 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-indigo-500 to-violet-600 inline-block text-transparent bg-clip-text">Practice Makes a man perfect.</h1>
    </div>
  );
}
