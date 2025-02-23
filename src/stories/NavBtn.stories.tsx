import { NavBtn } from "@/components/NavBtn";
import { ComponentProps } from "react";
import {Meta, StoryObj} from '@storybook/react'

type StoryProps = ComponentProps<typeof NavBtn>;

const meta: Meta<StoryProps> = {
    component: NavBtn,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            options: ['left', 'right'],
            control: {
                type: 'select'
            }
        }
    }
}

export default meta;


type Story = StoryObj<StoryProps>

export const BackBtn: Story = {
    args: {
        direction: 'left'
    },
    render: ({...args}) => {
        return <NavBtn {...args}/>
    },
};

export const NextBtn: Story = {
    args: {
        direction: 'right'
    },
    render: ({...args}) => {
        return <NavBtn {...args}/>
    },
};