import Image from "next/image";
import Login from '@/components/login';

export default function Home() {
  return (
    <>
      <div className="relative h-screen w-full">
        <Image
          src="/enfermera.jpg"
          alt="Fondo"
          fill
          className="object-cover -z-10 opacity-30"
          priority
        />
        <Login />
      </div>

    </>
  );
}
