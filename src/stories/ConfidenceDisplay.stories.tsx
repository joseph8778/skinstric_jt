import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ConfidenceDisplay } from "@/components/ConfidenceDisplay";

type StoryProps = ComponentProps<typeof ConfidenceDisplay>


const meta: Meta<StoryProps> = {
component: ConfidenceDisplay,
tags: ['autodocs'],
    argTypes: {
        currentSelectedCategory: {
            control: 'object',
            description: 'Current selected category with key and value',
            defaultValue: { key: 'Asian', value: .50 },
          },
    }
}

export default meta 

type Story = StoryObj<StoryProps>

export const LocationError: Story = {
    args: {
    currentSelectedCategory: { key: 'Asian', value: .5 }
    },
    render: ({...args}) => {
        return (
            <>
            <div className="block 900Brk:hidden">Expand Screen to show component</div>
        <div className="w-full h-[60%] 900Brk:h-[20%] flex justify-around gap-4 min-h-[600px]">
        <ConfidenceDisplay {...args}/>
        </div>
            </>
        )
    }

}