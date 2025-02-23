
import { ComponentProps } from "react";
import {Meta, StoryObj} from '@storybook/react'
import { BgSquare } from "@/components/BgSquare";

type StoryProps = ComponentProps<typeof BgSquare>;

const meta: Meta<StoryProps> = {
    component: BgSquare,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['big', 'medium', 'small'],
            control: {
                type: 'select'
            }
        }
    }
}

export default meta;


type Story = StoryObj<StoryProps>

export const SmallSquare: Story = {
    args: {
        size: 'small'
    },
    render: ({...args}) => {
        return <BgSquare {...args}/>
    },
};

export const MedSquare: Story = {
    args: {
        size: 'medium'
    },
    render: ({...args}) => {
        return <BgSquare {...args}/>
    }
};

    export const BigSquare: Story = {
        args: {
            size: 'big'
        },
        render: ({...args}) => {
            return <BgSquare {...args}/>
        },
    }