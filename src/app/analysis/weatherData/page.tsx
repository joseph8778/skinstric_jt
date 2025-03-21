'use client'

import { DataBox } from '@/components/DataBox';
import { Header } from '@/components/Header';
import { NavBtn } from '@/components/NavBtn';
import React from 'react';

const Page = () => {
    return (
        <>
        <Header/>
        <main>
        <DataBox></DataBox>
        </main>
        <footer>
            <NavBtn direction='left'></NavBtn>
        </footer>
        </>
    );
}

export default Page;
