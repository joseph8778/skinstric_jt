import { FilePopup } from "@/components/FilePopup";
import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";


type StoryProps = ComponentProps<typeof FilePopup>


const meta: Meta<StoryProps> = {
component: FilePopup,
tags: ['autodocs'],
    argTypes: {
        
    }
}

export default meta 

type Story = StoryObj<StoryProps>

export const confirmExit: Story = {

    render: ({...args}) => {
        return <FilePopup {...args}/>
    }

}