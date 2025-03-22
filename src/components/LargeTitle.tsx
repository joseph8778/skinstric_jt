import React from 'react'
import { NavBtn } from './NavBtn';

type LargeTitleProps = {
    title?: string;
    subtitle?: string;
    routerLink?: string;
    titleClasses?: string;
    subtitleClasses?: string;
}


export const LargeTitle = ({title = 'Demographics', subtitle = 'Predicted Age and Race', titleClasses, subtitleClasses}:LargeTitleProps) => {

    return (
    <div className={`w-full flex flex-col h-[20%] justify-start items-start mb-8`}>
        <h1 className={`textMount text-[38px] 520Brk:text-[42px] tracking-tighter ${titleClasses}`}>{title.toUpperCase()}</h1>
              <p className={`textMount text-[12px] tracking-tighter ml-[4px] ${subtitleClasses}`}>{subtitle.toUpperCase()}</p>
        <div className="visible 900Brk:hidden mt-6 ml-2">
            <NavBtn direction="left" routerLink="/testing" />
        </div>
    </div>
    )
}