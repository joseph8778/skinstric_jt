import { ExitPopup } from "@/components/ExitPopup";
import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";


type StoryProps = ComponentProps<typeof ExitPopup>


const meta: Meta<StoryProps> = {
component: ExitPopup,
tags: ['autodocs'],
    argTypes: {
        popupText: {control: { type: 'text' }}
    }
}

export default meta 

type Story = StoryObj<StoryProps>

export const confirmExit: Story = {
    args: {
        popupText: 'You are about to leave analysis. Are you sure?',
    },
    render: ({...args}) => {
        return <ExitPopup {...args}/>
    }

}