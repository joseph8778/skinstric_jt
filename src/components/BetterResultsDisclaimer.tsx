type BetterResultsDisclaimerProps = {
  parentProps?: string; 
}


export default function BetterResultsDisclaimer({ parentProps = '' }:BetterResultsDisclaimerProps) {

    return (
        <div className={` flex flex-col justify-center sm:items-center items-start  w-full max-w-[550px] gap-5 font-[400] absolute bottom-[50px] sm:top-auto -top-[300px] sm:left-auto left-4 dark:text-white ${parentProps}`}>
                <h1 className="text-[16px] sm:text-base">TO GET BETTER RESULTS BE SURE TO HAVE</h1>
                <h1 className="flex sm:flex-row flex-col sm:gap-0 gap-5 w-full justify-around text-[10px] sm:text-base">
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