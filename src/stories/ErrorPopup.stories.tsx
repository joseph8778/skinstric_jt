import { ErrorPopup } from "@/components/Popup";
import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";


type StoryProps = ComponentProps<typeof ErrorPopup>


const meta: Meta<StoryProps> = {
component: ErrorPopup,
tags: ['autodocs'],
    argTypes: {
        popupText: {control: { type: 'text' }}
    }
}

export default meta 

type Story = StoryObj<StoryProps>

export const LocationError: Story = {
    args: {
        popupText: 'Select from location dropdown for collecting weather data',
    },
    render: ({...args}) => {
        return <ErrorPopup {...args}/>
    }

}