import { Popup } from "@/components/Popup";
import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof Popup>


const meta: Meta<StoryProps> = {
component: Popup,
tags: ['autodocs'],
    argTypes: {
        popupType: {
            options: ['location_error', 'name_error', 'number_error', 'loading_Data'],
            control: {
                type: 'select'
            }
        },
        displayTime: {
            control: 'number'
        },
        popupMsg: {
            control: 'text'
        }
    }
}

export default meta 

type Story = StoryObj<StoryProps>

export const LocationError: Story = {
    render: ({...args}) => {
        return <Popup {...args}/>
    }

}