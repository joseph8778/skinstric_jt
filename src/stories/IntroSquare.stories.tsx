import { IntroSquare } from "@/components/IntroSquare";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof IntroSquare>


const meta: Meta<StoryProps> = {
    component:IntroSquare,
    tags: ['autodocs'],
    argTypes: {
        maxSize:{control: 'text'},
        minSize:{controle: 'text'},
        startVisible:{options:[true, false], control: {type: 'select'}}
    }
}

export default meta

type Story = StoryObj<StoryProps>

export const Small: Story = {
    args: {
        maxSize: '360',
        minSize: '140',
        startVisible: true
    },
    render: ({...args}) => {
        return <IntroSquare {...args}/>
    }
}
export const Medium: Story = {
    args: {
        maxSize: '400',
        minSize: '180',
        startVisible: true
    },
    render: ({...args}) => {
        return <IntroSquare {...args}/>
    }
}
export const Big: Story = {
    args: {
        maxSize: '440',
        minSize: '220',
        startVisible: true
    },
    render: ({...args}) => {
        return <IntroSquare {...args}/>
    }
}