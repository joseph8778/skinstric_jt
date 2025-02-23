import { Header } from '@/components/Header' 
import { ComponentProps } from 'react'
import {fn} from '@storybook/test'
import { Meta, StoryObj } from '@storybook/react'

type StoryProps = ComponentProps<typeof Header> & {innerText: string;};

const meta: Meta<StoryProps> = {
    component: Header,
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
            options: ['visible', 'hidden'],
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
        return <Header 
            {...args}
        />
    },
};
