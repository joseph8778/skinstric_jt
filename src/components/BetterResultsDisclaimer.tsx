type BetterResultsDisclaimerProps = {
  parentProps?: string; 
}


export default function BetterResultsDisclaimer({ parentProps = '' }:BetterResultsDisclaimerProps) {

    return (
        <div className={` flex flex-col justify-center items-center  w-full max-w-[550px] gap-5 font-[400] absolute bottom-24 dark:text-white ${parentProps}`}>
                <h1 className="text-[16px]">TO GET BETTER RESULTS BE SURE TO HAVE</h1>
                <h1 className="flex w-full justify-around">
                    <span className="flex justify-start items-center gap-1">
                        <div className="rotate-45 w-[12px] h-[12px] outline-1 outline mr-2"/>
                        NUETRAL EXPRESSION</span>
                    <span className="flex justify-start items-center gap-1">
                        <div className="rotate-45 w-[12px] h-[12px] outline-1 outline mr-2"/>
                        FRONTAL POSE</span>
                    <span className="flex justify-start items-center gap-1">
                        <div className="rotate-45 w-[12px] h-[12px] outline-1 outline mr-2"/>
                        ADEQUATE LIGHTING</span>
                </h1>
            </div>
    )
}