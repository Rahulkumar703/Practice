import Image from "next/image";

export default function Home() {
  return (
    <div className="grid place-items-center gap-6 py-4 pb-10">
      <Image src={'/illustration.svg'} width={100} height={100} className="w-full" alt="home" />
      <h1 className="text-xl font-semibold">Practice Makes a man perfect.</h1>
    </div>
  );
}
