import Image, { StaticImageData } from 'next/image';

type ActionButtonProps = {
    text?: string;
    onClick: () => void;
    icon?: string | StaticImageData;
    iconAlt?: string;
    parentClassName?: string;
}

export default function ActionButton({ text = 'Take a picture', onClick, icon = '@/assets/CameraIcon.svg', iconAlt = 'Camera Icon', parentClassName }: ActionButtonProps) {
    return (
        <div className={`group absolute
                 right-0 -translate-x-[10%] -translate-y-[50%]
                flex justify-center items-center gap-5  ${parentClassName}`}
                onClick={onClick}
                > 
                    <h1 className="z-10 dark:text-white font-semibold group-hover:-translate-x-[15%] transition-all ease-in-out duration-300">{text.toUpperCase()}</h1>
                        <div className="z-10 relative rounded-full bg-white size-16 flex justify-center items-center hover:cursor-pointer group-hover:scale-[1.2] transition-all duration-300 ease-in-out">
                            <div className="z-11 rounded-full border-2 border-gray-400 size-[95%] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] ">
                                {icon && <Image src={icon} className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]' alt={iconAlt}/>}
                            </div>
                        </div>
                </div>
    )
}