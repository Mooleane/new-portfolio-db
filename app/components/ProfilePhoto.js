import Image from 'next/image';

export default function ProfilePhoto() {
  return (
    <div className="rounded-full overflow-hidden" style={{ width: '300px', height: '300px' }}>
      <Image 
        src="/profile.png" 
        alt="Picture of the author"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
