import { IntroSqrAnim } from "@/components/IntroSqrAnim";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof IntroSqrAnim>

const meta: Meta<StoryProps> = {
    component: IntroSqrAnim,
    tags: ['autodocs'],
    argTypes: {
        linesAnimDuration: {
            type: 'number'
        },
        fadeOutDuration: {
            type: 'number'
        },
    }
}

export default meta;

type Story = StoryObj<StoryProps>

export const DefaultAnim: Story = {
    args:{
        linesAnimDuration: 3,
        fadeOutDuration: 1
    },
    render: ({...args}) => {
        return <IntroSqrAnim {...args}/>
    },
};