import { NavBar } from '@/components/NavBar' 
import { ComponentProps } from 'react'
import {fn} from '@storybook/test'
import { Meta, StoryObj } from '@storybook/react'

type StoryProps = ComponentProps<typeof NavBar> & {innerText: string;};

const meta: Meta<StoryProps> = {
    component: NavBar,
    tags: ['autodocs'],
    argTypes: {
        parent: {
            options: ['primaryStyle', 'NotAvail'],
            control: {
                type: 'select',
            },
        },
        logo: {
            options: ['primaryStyle', 'notAvail'],
            control:  {
                type: 'select',
            },
        },
        intro: {
            options: ['primaryStyle', 'notAvail'],
            control: {
                type: 'select',
            },
        },
    },
    args: {
        onClick: () => fn(),
    },
}

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        logoText: "SKINSTRIC",
        introText: "INTRO",
    },
    render: ({...args}) => {
        return <NavBar 
            logo="primaryStyle" 
            intro="primaryStyle"
            parent="primaryStyle"  
            {...args}
        />
    },
};
